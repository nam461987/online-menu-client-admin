/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import FuseUtils from "@fuse/utils/FuseUtils";
import axiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";

const loginUrl = Constants.API_ACCOUNT.login;
const loginWithTokenUrl = Constants.API_ACCOUNT.loginWithToken;
const { addOrUpdateUser, activeUser, updatePassword } = Constants.API_FIREBASE;

class CustomService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axiosConfigs.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                return new Promise((resolve, reject) => {
                    if (
                        err.response?.status === 401 &&
                        err.config &&
                        !err.config?.__isRetryRequest
                    ) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit("onAutoLogout", "Invalid access_token");
                        this.setSession(null);
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();

        if (!access_token) {
            this.emit("onNoAccessToken");

            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit("onAutoLogin", true);
        } else {
            this.setSession(null);
            this.emit("onAutoLogout", "access_token expired");
        }
    };

    handleLoginSuccess = (response, resolve) => {
        this.setSession(response.data.AccessToken);
        const userInfo = {
            from: "custom",
            type: response.data.Type,
            templateId: response.data.TemplateId,
            restaurantId: response.data.RestaurantId,
            permissions: response.data.Permissions,
            data: {
                displayName: response.data.Displayname,
                photoURL: response.data.Avatar,
                email: response.data.Email,
            },
        };
        resolve(userInfo);
    };

    signInWithEmailAndPassword = (username, password) => {
        return new Promise((resolve, reject) => {
            axiosConfigs
                .post(loginUrl, {
                    UserName: username,
                    Password: password,
                })
                .then((response) => {
                    if (response.data.AccessToken) {
                        this.handleLoginSuccess(response, resolve);
                    } else {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axiosConfigs
                .get(loginWithTokenUrl, {
                    params: {
                        token: this.getAccessToken(),
                    },
                })
                .then((response) => {
                    if (response.data.AccessToken) {
                        this.handleLoginSuccess(response, resolve);
                    } else {
                        this.logout();
                        reject(new Error("Failed to login with token."));
                    }
                })
                .catch((error) => {
                    this.logout();
                    reject(new Error("Failed to login with token."));
                });
        });
    };

    register = (user) => {
        axiosConfigs.post(addOrUpdateUser, {
            model: {
                FireBaseUid: user.uid,
                Email: user.email,
                PasswordHash: user.password,
                FullName: user.displayName,
            },
            restaurantTypeId: user.typeId,
        });
    };

    activeUser = (email) => {
        return new Promise((resolve, reject) => {
            axiosConfigs.put(activeUser, {}, { params: { email } });
        });
    };

    updatePassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axiosConfigs.put(
                updatePassword,
                {},
                { params: { email, password } }
            );
        });
    };

    setSession = (access_token) => {
        if (access_token) {
            const currentDate = new Date();
            localStorage.setItem("login_access_token", access_token);
            localStorage.setItem(
                "token_expire",
                currentDate.getTime() + 60 * 60 * 1000 * 2
            ); // expire in 2 hours
            axiosConfigs.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        } else {
            localStorage.removeItem("login_access_token");
            localStorage.removeItem("token_expire");
            delete axiosConfigs.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = (access_token) => {
        if (!access_token) {
            return false;
        }
        const tokenExpire = localStorage.getItem("token_expire");
        const currentTime = Date.now() / 1000;
        if (tokenExpire < currentTime) {
            console.warn("access token expired");
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem("login_access_token");
    };
}

const instance = new CustomService();

export default instance;
