/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../template/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/template`;
const apiPath = Constants.API_TEMPLATE;

export const getTemplates = createAsyncThunk(
    `${preName}/getTemplates`,
    async (args) => {
        const response = await AxiosConfigs.get(apiPath.template, {
            params: args,
        });
        const data = await response.data;
        return data;
    }
);

export const removeTemplates = createAsyncThunk(
    `${preName}/removeTemplates`,
    async (arr, { dispatch, getState }) => {
        const response = await AxiosConfigs.put(
            apiPath.arrayActive,
            {},
            {
                params: { arr },
                paramsSerializer: (params) => {
                    return qs.stringify(params);
                },
            }
        );

        const data = await response.data;

        return data;
    }
);

const templatesAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const { selectAll: selectTemplates, selectById: selectTemplateById } =
    templatesAdapter.getSelectors(
        (state) => state[scope.reducerName].templates
    );

const templatesSlice = createSlice({
    name: preName,
    initialState: templatesAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        // [getTemplates.fulfilled]: templatesAdapter.setAll,
        [getTemplates.fulfilled]: (state, action) => {
            templatesAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeTemplates.fulfilled]: (state, action) =>
            templatesAdapter.setMany(state, action.payload),
    },
});

export default templatesSlice.reducer;
