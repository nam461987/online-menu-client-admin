/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../permission/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/permission`;

export const getPermission = createAsyncThunk(
    `${preName}/getPermission`,
    async (id) => {
        const response = await AxiosConfigs.get(
            `${Constants.API_PERMISSION.permission}/${id}`
        );
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const removePermission = createAsyncThunk(
    `${preName}/removePermission`,
    async (val, { dispatch, getState }) => {
        const id = getState()[scope.reducerName].permission[obj.primaryKey];
        await AxiosConfigs.put(
            Constants.API_PERMISSION.active,
            {},
            { params: { id } }
        );

        return id;
    }
);

export const addPermission = createAsyncThunk(
    `${preName}/addPermission`,
    async (form, { dispatch, getState }) => {
        const { permission } = getState()[scope.reducerName];
        const response = await AxiosConfigs.post(
            `${Constants.API_PERMISSION.permission}`,
            { ...permission, ...form }
        );

        const data = await response.data;

        return data;
    }
);

export const savePermission = createAsyncThunk(
    `${preName}/savePermission`,
    async (form, { dispatch, getState }) => {
        const { permission } = getState().account;

        await AxiosConfigs.put(
            `${Constants.API_PERMISSION.permission}/${form[obj.primaryKey]}`,
            {
                ...permission,
                ...form,
            }
        );

        return {
            ...permission,
            ...form,
        };
    }
);

const permissionSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetPermission: () => null,
        newPermission: {
            reducer: (state, action) => action.payload,
            prepare: (event) => {
                const initialForm = setInitialForm(obj);
                return {
                    payload: {
                        ...initialForm,
                    },
                };
            },
        },
    },
    extraReducers: {
        [getPermission.fulfilled]: (state, action) => action.payload,
        [addPermission.fulfilled]: (state, action) => action.payload,
        [savePermission.fulfilled]: (state, action) => action.payload,
        [removePermission.fulfilled]: (state, action) => null,
    },
});

export const { newPermission, resetPermission } = permissionSlice.actions;

export default permissionSlice.reducer;
