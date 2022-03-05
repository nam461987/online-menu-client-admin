/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../permission/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/groupPermission`;

export const getGroups = createAsyncThunk(`${preName}/getGroups`, async () => {
    const response = await AxiosConfigs.get(
        `${Constants.API_GROUP_PERMISSION.getgroup}`
    );
    const data = await response.data;

    return data === undefined ? null : data;
});

export const getModules = createAsyncThunk(
    `${preName}/getModules`,
    async () => {
        const response = await AxiosConfigs.get(
            `${Constants.API_GROUP_PERMISSION.getmodule}`
        );
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const getPermissions = createAsyncThunk(
    `${preName}/getPermissions`,
    async (args) => {
        const response = await AxiosConfigs.get(
            `${Constants.API_GROUP_PERMISSION.getpermission}`,
            {
                params: {
                    ...args,
                },
            }
        );
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const updateGroupPermission = createAsyncThunk(
    `${preName}/updateGroupPermission`,
    async (args, { dispatch, getState }) => {
        await AxiosConfigs.put(
            Constants.API_GROUP_PERMISSION.grouppermission,
            {},
            { params: { ...args } }
        );
    }
);

const permissionSlice = createSlice({
    name: preName,
    initialState: { groups: [], modules: [], permissions: [] },
    reducers: {},
    extraReducers: {
        [getGroups.fulfilled]: (state, action) => {
            state.groups = action.payload;
        },
        [getModules.fulfilled]: (state, action) => {
            state.modules = action.payload;
        },
        [getPermissions.fulfilled]: (state, action) => {
            state.permissions = action.payload;
        },
        [updateGroupPermission.fulfilled]: (state, action) => state,
    },
});

export default permissionSlice.reducer;
