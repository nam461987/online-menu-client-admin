/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../menu/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menu`;
const apiPath = Constants.API_MENU;

export const getMenus = createAsyncThunk(
    `${preName}/getMenus`,
    async (args) => {
        const response = await AxiosConfigs.get(apiPath.menu, {
            params: args,
        });
        const data = await response.data;
        return data;
    }
);

export const removeMenus = createAsyncThunk(
    `${preName}/removeMenus`,
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

const menusAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const { selectAll: selectMenus, selectById: selectMenuById } =
    menusAdapter.getSelectors((state) => state[scope.reducerName].menus);

const menusSlice = createSlice({
    name: preName,
    initialState: menusAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        // [getMenus.fulfilled]: menusAdapter.setAll,
        [getMenus.fulfilled]: (state, action) => {
            menusAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeMenus.fulfilled]: (state, action) =>
            menusAdapter.setMany(state, action.payload),
    },
});

export default menusSlice.reducer;
