/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../menu-size/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menuSize`;

export const getMenuSizes = createAsyncThunk(
    `${preName}/getMenuSizes`,
    async (args) => {
        const response = await AxiosConfigs.get(
            Constants.API_MENU_SIZE.menuSize,
            {
                params: args,
            }
        );
        const data = await response.data;
        return data;
    }
);

export const removeMenuSizes = createAsyncThunk(
    `${preName}/removeMenuSizes`,
    async (arr, { dispatch, getState }) => {
        const response = await AxiosConfigs.put(
            Constants.API_MENU_SIZE.arrayActive,
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

const menuSizesAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const { selectAll: selectMenuSizes, selectById: selectMenuSizeById } =
    menuSizesAdapter.getSelectors(
        (state) => state[scope.reducerName].menuSizes
    );

const menuSizesSlice = createSlice({
    name: preName,
    initialState: menuSizesAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        // [getMenuSizes.fulfilled]: menuSizesAdapter.setAll,
        [getMenuSizes.fulfilled]: (state, action) => {
            menuSizesAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeMenuSizes.fulfilled]: (state, action) =>
            menuSizesAdapter.setMany(state, action.payload),
    },
});

export default menuSizesSlice.reducer;
