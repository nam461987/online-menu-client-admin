/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import firebaseService from "app/services/firebaseService";
import jwtService from "app/services/jwtService";
import customService from "app/services/customService";
import {
    createUserSettingsFirebase,
    setUserData,
    logoutUser,
} from "./userSlice";

export const submitRegister =
    ({ displayName, password, email }) =>
    async (dispatch) => {
        return jwtService
            .createUser({
                displayName,
                password,
                email,
            })
            .then((user) => {
                dispatch(setUserData(user));
                return dispatch(registerSuccess());
            })
            .catch((errors) => {
                return dispatch(registerError(errors));
            });
    };

export const registerWithFirebase = (model) => async (dispatch) => {
    if (!firebaseService.auth) {
        console.warn(
            "Firebase Service didn't initialize, check your configuration"
        );

        return () => false;
    }
    const { email, password, displayName, typeId } = model;

    return firebaseService.auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            // Send verify email
            response.user.sendEmailVerification();

            dispatch(
                createUserSettingsFirebase({
                    ...response.user,
                    displayName,
                    email,
                    typeId,
                })
            );

            // logout user after add user to DB
            // dispatch(logoutUser());

            return dispatch(registerSuccess());
        })
        .catch((error) => {
            return handleFirebaseError(error, dispatch);
        });
};

export const registerWithFirebaseAndDBOwner = (model) => async (dispatch) => {
    if (!firebaseService.auth) {
        console.warn(
            "Firebase Service didn't initialize, check your configuration"
        );

        return () => false;
    }
    const { email, password, displayName, typeId } = model;
    console.log(model);

    return firebaseService.auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            // Create User on own database
            customService.register({
                ...response.user,
                displayName,
                password,
                email,
                typeId,
            });

            // Send verify email
            response.user.sendEmailVerification();

            dispatch(
                createUserSettingsFirebase({
                    ...response.user,
                    displayName,
                    password,
                    email,
                    typeId,
                })
            );

            // logout user after add user to DB
            // dispatch(logoutUser());

            return dispatch(registerSuccess());
        })
        .catch((error) => {
            return handleFirebaseError(error, dispatch);
        });
};

const handleFirebaseError = (error, dispatch) => {
    const usernameErrorCodes = [
        "auth/operation-not-allowed",
        "auth/user-not-found",
        "auth/user-disabled",
    ];

    const emailErrorCodes = ["auth/email-already-in-use", "auth/invalid-email"];

    const passwordErrorCodes = ["auth/weak-password", "auth/wrong-password"];

    const response = [];

    if (usernameErrorCodes.includes(error.code)) {
        response.push({
            type: "username",
            message: error.message,
        });
    }

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

    return dispatch(registerError(response));
};

const initialState = {
    success: false,
    errors: [],
};

const registerSlice = createSlice({
    name: "auth/register",
    initialState,
    reducers: {
        registerSuccess: (state, action) => {
            state.success = true;
            state.errors = [];
        },
        registerError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
        },
    },
    extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
