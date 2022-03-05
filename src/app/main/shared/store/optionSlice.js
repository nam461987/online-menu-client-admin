/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";

const preName = "common";

export const getOptionsByKey = createAsyncThunk(
    `${preName}/getOptionsByKey`,
    async ({ fieldName, optionUrl }) => {
        const options = {};
        switch (typeof optionUrl) {
            case "string": {
                const request = await AxiosConfigs.get(optionUrl);
                const objName = `options_${fieldName}_${optionUrl}`;
                options[objName] = await request.data;
                return options;
            }
            case "object": {
                const objName = `options_${fieldName}_array`;
                options[objName] = optionUrl;
                return options;
            }
            default: {
                return options;
            }
        }
    }
);

export const getOptionsByDependId = createAsyncThunk(
    `${preName}/getOptionsByDependId`,
    async ({ fieldName, optionUrl, id }) => {
        const options = {};
        switch (typeof optionUrl) {
            case "string": {
                const request = AxiosConfigs.get(optionUrl, {
                    params: {
                        id,
                    },
                });
                const objName = `options_${fieldName}_${optionUrl}`;
                options[objName] = await request.data;
                return options;
            }
            case "object": {
                const objName = `options_${fieldName}_array`;
                options[objName] = optionUrl;
                return options;
            }
            default: {
                return options;
            }
        }
    }
);

const optionSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        ClearOptionsInLogin: {
            reducer: (state, action) => {
                state.options = {};
            },
        },
    },
    extraReducers: {
        [getOptionsByKey.fulfilled]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [getOptionsByDependId.fulfilled]: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { extraReducers } = optionSlice.actions;

export default optionSlice.reducer;
