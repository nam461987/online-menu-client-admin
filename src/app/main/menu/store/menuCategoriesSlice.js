/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../menu-category/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menuCategory`;

export const getMenuCategories = createAsyncThunk(
    `${preName}/getMenuCategories`,
    async (args) => {
        const response = await AxiosConfigs.get(
            Constants.API_MENU_CATEGORY.menuCategory,
            {
                params: args,
            }
        );
        const data = await response.data;
        return data;
    }
);

export const removeMenuCategories = createAsyncThunk(
    `${preName}/removeMenuCategories`,
    async (arr, { dispatch, getState }) => {
        const response = await AxiosConfigs.put(
            Constants.API_MENU_CATEGORY.arrayActive,
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

const menuCategoriesAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const {
    selectAll: selectMenuCategories,
    selectById: selectMenuCategoryById,
} = menuCategoriesAdapter.getSelectors(
    (state) => state[scope.reducerName].menuCategories
);

const menuCategoriesSlice = createSlice({
    name: preName,
    initialState: menuCategoriesAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        // [getMenuCategories.fulfilled]: menuCategoriesAdapter.setAll,
        [getMenuCategories.fulfilled]: (state, action) => {
            menuCategoriesAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeMenuCategories.fulfilled]: (state, action) =>
            menuCategoriesAdapter.setMany(state, action.payload),
    },
});

export default menuCategoriesSlice.reducer;
