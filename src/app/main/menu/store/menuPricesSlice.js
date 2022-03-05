/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../menu-price/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menuPrice`;
const apiPath = Constants.API_MENU_PRICE;

export const getMenuPrices = createAsyncThunk(
    `${preName}/getMenuPrices`,
    async (args) => {
        const response = await AxiosConfigs.get(apiPath.menuPrice, {
            params: args,
        });
        const data = await response.data;
        return data;
    }
);

export const removeMenuPrices = createAsyncThunk(
    `${preName}/removeMenuPrices`,
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

const menuPricesAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const { selectAll: selectMenuPrices, selectById: selectMenuPriceById } =
    menuPricesAdapter.getSelectors(
        (state) => state[scope.reducerName].menuPrices
    );

const menuPricesSlice = createSlice({
    name: preName,
    initialState: menuPricesAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        // [getMenuPrices.fulfilled]: menuPricesAdapter.setAll,
        [getMenuPrices.fulfilled]: (state, action) => {
            menuPricesAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeMenuPrices.fulfilled]: (state, action) =>
            menuPricesAdapter.setMany(state, action.payload),
    },
});

export default menuPricesSlice.reducer;
