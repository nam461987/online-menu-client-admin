/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../menu-price/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menuPrice`;
const apiPath = Constants.API_MENU_PRICE;

export const getMenuPrice = createAsyncThunk(
    `${preName}/getMenuPrice`,
    async (id) => {
        const response = await AxiosConfigs.get(`${apiPath.menuPrice}/${id}`);
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const removeMenuPrice = createAsyncThunk(
    `${preName}/removeMenuPrice`,
    async (val, { dispatch, getState }) => {
        const id = getState().menu.menuPrice[obj.primaryKey];
        await AxiosConfigs.put(apiPath.active, {}, { params: { id } });

        return id;
    }
);

export const addMenuPrice = createAsyncThunk(
    `${preName}/addMenuPrice`,
    async (form, { dispatch, getState }) => {
        const { menuPrice } = getState().menu;
        const response = await AxiosConfigs.post(`${apiPath.menuPrice}`, {
            ...menuPrice,
            ...form,
        });

        const data = await response.data;

        return data;
    }
);

export const saveMenuPrice = createAsyncThunk(
    `${preName}/saveMenuPrice`,
    async (form, { dispatch, getState }) => {
        const { menuPrice } = getState().menu;

        await AxiosConfigs.put(`${apiPath.menuPrice}/${form[obj.primaryKey]}`, {
            ...menuPrice,
            ...form,
        });

        return {
            ...menuPrice,
            ...form,
        };
    }
);

const menuPriceSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetMenuPrice: () => null,
        newMenuPrice: {
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
        [getMenuPrice.fulfilled]: (state, action) => action.payload,
        [addMenuPrice.fulfilled]: (state, action) => action.payload,
        [saveMenuPrice.fulfilled]: (state, action) => action.payload,
        [removeMenuPrice.fulfilled]: (state, action) => null,
    },
});

export const { newMenuPrice, resetMenuPrice } = menuPriceSlice.actions;

export default menuPriceSlice.reducer;
