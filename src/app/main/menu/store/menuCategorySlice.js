/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../menu-category/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menuCategory`;

export const getMenuCategory = createAsyncThunk(
    `${preName}/getMenuCategory`,
    async (id) => {
        const response = await AxiosConfigs.get(
            `${Constants.API_MENU_CATEGORY.menuCategory}/${id}`
        );
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const removeMenuCategory = createAsyncThunk(
    `${preName}/removeMenuCategory`,
    async (val, { dispatch, getState }) => {
        const id = getState().menu.menuCategory[obj.primaryKey];
        await AxiosConfigs.put(
            Constants.API_MENU_CATEGORY.active,
            {},
            { params: { id } }
        );

        return id;
    }
);

export const addMenuCategory = createAsyncThunk(
    `${preName}/addMenuCategory`,
    async (form, { dispatch, getState }) => {
        const { menuCategory } = getState().menu;
        const response = await AxiosConfigs.post(
            `${Constants.API_MENU_CATEGORY.menuCategory}`,
            { ...menuCategory, ...form }
        );

        const data = await response.data;

        return data;
    }
);

export const saveMenuCategory = createAsyncThunk(
    `${preName}/saveMenuCategory`,
    async (form, { dispatch, getState }) => {
        const { menuCategory } = getState().menu;

        await AxiosConfigs.put(
            `${Constants.API_MENU_CATEGORY.menuCategory}/${
                form[obj.primaryKey]
            }`,
            {
                ...menuCategory,
                ...form,
            }
        );

        return {
            ...menuCategory,
            ...form,
        };
    }
);

const menuCategorySlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetMenuCategory: () => null,
        newMenuCategory: {
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
        [getMenuCategory.fulfilled]: (state, action) => action.payload,
        [addMenuCategory.fulfilled]: (state, action) => action.payload,
        [saveMenuCategory.fulfilled]: (state, action) => action.payload,
        [removeMenuCategory.fulfilled]: (state, action) => null,
    },
});

export const { newMenuCategory, resetMenuCategory } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;
