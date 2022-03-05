/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../permission/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/permission`;

export const getPermissions = createAsyncThunk(
    `${preName}/getPermissions`,
    async (args) => {
        const response = await AxiosConfigs.get(
            Constants.API_PERMISSION.permission,
            {
                params: args,
            }
        );
        const data = await response.data;
        return data;
    }
);

export const removePermissions = createAsyncThunk(
    `${preName}/removePermissions`,
    async (arr, { dispatch, getState }) => {
        const response = await AxiosConfigs.put(
            Constants.API_PERMISSION.arrayActive,
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

const permissionsAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const {
    selectAll: selectPermissions,
    selectById: selectPermissionById,
} = permissionsAdapter.getSelectors(
    (state) => state[scope.reducerName].permissions
);

const permissionsSlice = createSlice({
    name: preName,
    initialState: permissionsAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [getPermissions.fulfilled]: (state, action) => {
            permissionsAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removePermissions.fulfilled]: (state, action) =>
            permissionsAdapter.setMany(state, action.payload),
    },
});

export default permissionsSlice.reducer;
