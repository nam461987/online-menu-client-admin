/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../template/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/template`;
const apiPath = Constants.API_TEMPLATE;

export const getTemplate = createAsyncThunk(
    `${preName}/getTemplate`,
    async (id) => {
        const response = await AxiosConfigs.get(`${apiPath.template}/${id}`);
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const removeTemplate = createAsyncThunk(
    `${preName}/removeTemplate`,
    async (val, { dispatch, getState }) => {
        const id = getState().template.template[obj.primaryKey];
        await AxiosConfigs.put(apiPath.active, {}, { params: { id } });

        return id;
    }
);

export const addTemplate = createAsyncThunk(
    `${preName}/addTemplate`,
    async (form, { dispatch, getState }) => {
        const { template } = getState().template;
        const response = await AxiosConfigs.post(`${apiPath.template}`, {
            ...template,
            ...form,
        });

        const data = await response.data;

        return data;
    }
);

export const saveTemplate = createAsyncThunk(
    `${preName}/saveTemplate`,
    async (form, { dispatch, getState }) => {
        const { template } = getState().template;

        await AxiosConfigs.put(`${apiPath.template}/${form[obj.primaryKey]}`, {
            ...template,
            ...form,
        });

        return {
            ...template,
            ...form,
        };
    }
);

const templateSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetTemplate: () => null,
        newTemplate: {
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
        [getTemplate.fulfilled]: (state, action) => action.payload,
        [addTemplate.fulfilled]: (state, action) => action.payload,
        [saveTemplate.fulfilled]: (state, action) => action.payload,
        [removeTemplate.fulfilled]: (state, action) => null,
    },
});

export const { newTemplate, resetTemplate } = templateSlice.actions;

export default templateSlice.reducer;
