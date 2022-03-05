/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../account/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/account`;

export const getAccount = createAsyncThunk(
    `${preName}/getAccount`,
    async (id) => {
        const response = await AxiosConfigs.get(
            `${Constants.API_ACCOUNT.account}/${id}`
        );
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const removeAccount = createAsyncThunk(
    `${preName}/removeAccount`,
    async (val, { dispatch, getState }) => {
        const id = getState()[scope.reducerName].account[obj.primaryKey];
        await AxiosConfigs.put(
            Constants.API_ACCOUNT.active,
            {},
            { params: { id } }
        );

        return id;
    }
);

export const addAccount = createAsyncThunk(
    `${preName}/addAccount`,
    async (form, { dispatch, getState }) => {
        const { account } = getState()[scope.reducerName];
        const response = await AxiosConfigs.post(
            `${Constants.API_ACCOUNT.account}`,
            { ...account, ...form }
        );

        const data = await response.data;

        return data;
    }
);

export const saveAccount = createAsyncThunk(
    `${preName}/saveAccount`,
    async (form, { dispatch, getState }) => {
        const { account } = getState().account;

        await AxiosConfigs.put(
            `${Constants.API_ACCOUNT.account}/${form[obj.primaryKey]}`,
            {
                ...account,
                ...form,
            }
        );

        return {
            ...account,
            ...form,
        };
    }
);

const accountSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetAccount: () => null,
        newAccount: {
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
        [getAccount.fulfilled]: (state, action) => action.payload,
        [addAccount.fulfilled]: (state, action) => action.payload,
        [saveAccount.fulfilled]: (state, action) => action.payload,
        [removeAccount.fulfilled]: (state, action) => null,
    },
});

export const { newAccount, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;
