/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../group/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/group`;

export const getGroup = createAsyncThunk(`${preName}/getGroup`, async (id) => {
    const response = await AxiosConfigs.get(
        `${Constants.API_GROUP.group}/${id}`
    );
    const data = await response.data;

    return data === undefined ? null : data;
});

export const removeGroup = createAsyncThunk(
    `${preName}/removeGroup`,
    async (val, { dispatch, getState }) => {
        const id = getState().account.group[obj.primaryKey];
        await AxiosConfigs.put(
            Constants.API_GROUP.active,
            {},
            { params: { id } }
        );

        return id;
    }
);

export const addGroup = createAsyncThunk(
    `${preName}/addGroup`,
    async (form, { dispatch, getState }) => {
        const { group } = getState()[scope.reducerName];
        const response = await AxiosConfigs.post(
            `${Constants.API_GROUP.group}`,
            { ...group, ...form }
        );

        const data = await response.data;

        return data;
    }
);

export const saveGroup = createAsyncThunk(
    `${preName}/saveGroup`,
    async (form, { dispatch, getState }) => {
        const { group } = getState()[scope.reducerName];

        await AxiosConfigs.put(
            `${Constants.API_GROUP.group}/${form[obj.primaryKey]}`,
            {
                ...group,
                ...form,
            }
        );

        return {
            ...group,
            ...form,
        };
    }
);

const groupSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetGroup: () => null,
        newGroup: {
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
        [getGroup.fulfilled]: (state, action) => action.payload,
        [addGroup.fulfilled]: (state, action) => action.payload,
        [saveGroup.fulfilled]: (state, action) => action.payload,
        [removeGroup.fulfilled]: (state, action) => null,
    },
});

export const { newGroup, resetGroup } = groupSlice.actions;

export default groupSlice.reducer;
