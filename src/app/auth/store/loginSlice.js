/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import firebaseService from "app/services/firebaseService";
import jwtService from "app/services/jwtService";
import customService from "app/services/customService";
import { setUserData } from "./userSlice";

export const submitLogin =
    ({ email, password }) =>
    async (dispatch) => {
        return jwtService
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch(setUserData(user));

                return dispatch(loginSuccess());
            })
            .catch((errors) => {
                return dispatch(loginError(errors));
            });
    };

export const submitLoginWithCustom =
    ({ username, password }) =>
    async (dispatch) => {
        return customService
            .signInWithEmailAndPassword(username, password)
            .then((user) => {
                dispatch(setUserData(user));

                return dispatch(loginSuccess());
            })
            .catch((errors) => {
                return dispatch(loginError(errors));
            });
    };

export const submitLoginWithFireBase =
    ({ email, password }) =>
    async (dispatch) => {
        if (!firebaseService.auth) {
            console.warn(
                "Firebase Service didn't initialize, check your configuration"
            );

            return () => false;
        }
        return firebaseService.auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                // Check email verified yet
                if (user.emailVerified) {
                    // Check verified field from FireBase
                    // If not, active user on owner DB first
                    if (!user.verified) {
                        const verified = customService.activeUser(email);

                        // If verify success on owner db
                        // update verified field on FireBase
                        if (verified) {
                            firebaseService.updateUserVerified(user);
                        }
                    }

                    // Use custom login to get token and some necessary fields
                    customService
                        .signInWithEmailAndPassword(email, password)
                        .then((ownerUser) => {
                            dispatch(setUserData(ownerUser));
                            return dispatch(loginSuccess());
                        });
                } else {
                    return dispatch(
                        loginError([
                            {
                                type: "email",
                                message: "Email is not verified yet. Check your email to active.",
                            },
                        ]),
                        // Send verify email
                        user.sendEmailVerification()
                    );
                }
            })
            .catch((error) => {
                const emailErrorCodes = [
                    "auth/email-already-in-use",
                    "auth/invalid-email",
                    "auth/operation-not-allowed",
                    "auth/user-not-found",
                    "auth/user-disabled",
                ];
                const passwordErrorCodes = [
                    "auth/weak-password",
                    "auth/wrong-password",
                ];
                const response = [];

                if (emailErrorCodes.includes(error.code)) {
                    response.push({
                        type: "email",
                        message: error.message,
                    });
                }

                if (passwordErrorCodes.includes(error.code)) {
                    response.push({
                        type: "password",
                        message: error.message,
                    });
                }

                if (error.code === "auth/invalid-api-key") {
                    dispatch(showMessage({ message: error.message }));
                }

                return dispatch(loginError(response));
            });
    };

const initialState = {
    success: false,
    errors: [],
};

const loginSlice = createSlice({
    name: "auth/login",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.success = true;
            state.errors = [];
        },
        loginError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
        },
    },
    extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
