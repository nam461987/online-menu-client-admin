/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../menu-unit/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menuUnit`;

export const getMenuUnit = createAsyncThunk(
    `${preName}/getMenuUnit`,
    async (id) => {
        const response = await AxiosConfigs.get(
            `${Constants.API_MENU_UNIT.menuUnit}/${id}`
        );
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const removeMenuUnit = createAsyncThunk(
    `${preName}/removeMenuUnit`,
    async (val, { dispatch, getState }) => {
        const id = getState().menu.menuUnit[obj.primaryKey];
        await AxiosConfigs.put(
            Constants.API_MENU_UNIT.active,
            {},
            { params: { id } }
        );

        return id;
    }
);

export const addMenuUnit = createAsyncThunk(
    `${preName}/addMenuUnit`,
    async (form, { dispatch, getState }) => {
        const { menuUnit } = getState().menu;
        const response = await AxiosConfigs.post(
            `${Constants.API_MENU_UNIT.menuUnit}`,
            { ...menuUnit, ...form }
        );

        const data = await response.data;

        return data;
    }
);

export const saveMenuUnit = createAsyncThunk(
    `${preName}/saveMenuUnit`,
    async (form, { dispatch, getState }) => {
        const { menuUnit } = getState().menu;

        await AxiosConfigs.put(
            `${Constants.API_MENU_UNIT.menuUnit}/${form[obj.primaryKey]}`,
            {
                ...menuUnit,
                ...form,
            }
        );

        return {
            ...menuUnit,
            ...form,
        };
    }
);

const menuUnitSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetMenuUnit: () => null,
        newMenuUnit: {
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
        [getMenuUnit.fulfilled]: (state, action) => action.payload,
        [addMenuUnit.fulfilled]: (state, action) => action.payload,
        [saveMenuUnit.fulfilled]: (state, action) => action.payload,
        [removeMenuUnit.fulfilled]: (state, action) => null,
    },
});

export const { newMenuUnit, resetMenuUnit } = menuUnitSlice.actions;

export default menuUnitSlice.reducer;
