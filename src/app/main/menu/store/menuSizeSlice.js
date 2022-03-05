/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../menu-size/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menuSize`;

export const getMenuSize = createAsyncThunk(
    `${preName}/getMenuSize`,
    async (id) => {
        const response = await AxiosConfigs.get(
            `${Constants.API_MENU_SIZE.menuSize}/${id}`
        );
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const removeMenuSize = createAsyncThunk(
    `${preName}/removeMenuSize`,
    async (val, { dispatch, getState }) => {
        const id = getState().menu.menuSize[obj.primaryKey];
        await AxiosConfigs.put(
            Constants.API_MENU_SIZE.active,
            {},
            { params: { id } }
        );

        return id;
    }
);

export const addMenuSize = createAsyncThunk(
    `${preName}/addMenuSize`,
    async (form, { dispatch, getState }) => {
        const { menuSize } = getState().menu;
        const response = await AxiosConfigs.post(
            `${Constants.API_MENU_SIZE.menuSize}`,
            { ...menuSize, ...form }
        );

        const data = await response.data;

        return data;
    }
);

export const saveMenuSize = createAsyncThunk(
    `${preName}/saveMenuSize`,
    async (form, { dispatch, getState }) => {
        const { menuSize } = getState().menu;

        await AxiosConfigs.put(
            `${Constants.API_MENU_SIZE.menuSize}/${form[obj.primaryKey]}`,
            {
                ...menuSize,
                ...form,
            }
        );

        return {
            ...menuSize,
            ...form,
        };
    }
);

const menuSizeSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetMenuSize: () => null,
        newMenuSize: {
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
        [getMenuSize.fulfilled]: (state, action) => action.payload,
        [addMenuSize.fulfilled]: (state, action) => action.payload,
        [saveMenuSize.fulfilled]: (state, action) => action.payload,
        [removeMenuSize.fulfilled]: (state, action) => null,
    },
});

export const { newMenuSize, resetMenuSize } = menuSizeSlice.actions;

export default menuSizeSlice.reducer;
