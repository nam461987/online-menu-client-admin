/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../restaurant/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/restaurant`;
const apiPath = Constants.API_RESTAURANT;

export const getRestaurants = createAsyncThunk(
    `${preName}/getRestaurants`,
    async (args) => {
        const response = await AxiosConfigs.get(apiPath.restaurant, {
            params: args,
        });
        const data = await response.data;
        return data;
    }
);

export const removeRestaurants = createAsyncThunk(
    `${preName}/removeRestaurants`,
    async (arr, { dispatch, getState }) => {
        return [];
    }
);

const restaurantsAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const {
    selectAll: selectRestaurants,
    selectById: selectRestaurantById,
} = restaurantsAdapter.getSelectors(
    (state) => state[scope.reducerName].restaurants
);

const restaurantsSlice = createSlice({
    name: preName,
    initialState: restaurantsAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [getRestaurants.fulfilled]: (state, action) => {
            restaurantsAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeRestaurants.fulfilled]: (state, action) => {
            return false;
        },
    },
});

export default restaurantsSlice.reducer;
