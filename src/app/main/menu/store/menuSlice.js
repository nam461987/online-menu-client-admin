/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../menu/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menu`;
const apiPath = Constants.API_MENU;

export const getMenu = createAsyncThunk(`${preName}/getMenu`, async (id) => {
    const response = await AxiosConfigs.get(`${apiPath.menu}/${id}`);
    const data = await response.data;

    return data === undefined ? null : data;
});

export const removeMenu = createAsyncThunk(
    `${preName}/removeMenu`,
    async (val, { dispatch, getState }) => {
        const id = getState().menu.menu[obj.primaryKey];
        await AxiosConfigs.put(apiPath.active, {}, { params: { id } });

        return id;
    }
);

export const addMenu = createAsyncThunk(
    `${preName}/addMenu`,
    async (form, { dispatch, getState }) => {
        const { menu } = getState().menu;
        const response = await AxiosConfigs.post(`${apiPath.menu}`, {
            ...menu,
            ...form,
        });

        const data = await response.data;

        return data;
    }
);

export const saveMenu = createAsyncThunk(
    `${preName}/saveMenu`,
    async (form, { dispatch, getState }) => {
        const { menu } = getState().menu;

        await AxiosConfigs.put(`${apiPath.menu}/${form[obj.primaryKey]}`, {
            ...menu,
            ...form,
        });

        return {
            ...menu,
            ...form,
        };
    }
);

const menuSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetMenu: () => null,
        newMenu: {
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
        [getMenu.fulfilled]: (state, action) => action.payload,
        [addMenu.fulfilled]: (state, action) => action.payload,
        [saveMenu.fulfilled]: (state, action) => action.payload,
        [removeMenu.fulfilled]: (state, action) => null,
    },
});

export const { newMenu, resetMenu } = menuSlice.actions;

export default menuSlice.reducer;
