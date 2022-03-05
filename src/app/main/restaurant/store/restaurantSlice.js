/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import setInitialForm from "app/common/functions/initialForm";
import obj from "../restaurant/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/restaurant`;
const apiPath = Constants.API_RESTAURANT;

export const getRestaurant = createAsyncThunk(
    `${preName}/getRestaurant`,
    async (id) => {
        const response = await AxiosConfigs.get(`${apiPath.restaurant}/${id}`);
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const removeRestaurant = createAsyncThunk(
    `${preName}/removeRestaurant`,
    async (val, { dispatch, getState }) => {
        const id = getState().restaurant.restaurant[obj.primaryKey];
        await AxiosConfigs.put(apiPath.active, {}, { params: { id } });

        return id;
    }
);

export const addRestaurant = createAsyncThunk(
    `${preName}/addRestaurant`,
    async (form, { dispatch, getState }) => {
        const { restaurant } = getState().restaurant;
        const response = await AxiosConfigs.post(`${apiPath.restaurant}`, {
            ...restaurant,
            ...form,
        });

        const data = await response.data;

        return data;
    }
);

export const saveRestaurant = createAsyncThunk(
    `${preName}/saveRestaurant`,
    async (form, { dispatch, getState }) => {
        const { restaurant } = getState().restaurant;

        await AxiosConfigs.put(
            `${apiPath.restaurant}/${form[obj.primaryKey]}`,
            {
                ...restaurant,
                ...form,
            }
        );

        return {
            ...restaurant,
            ...form,
        };
    }
);

export const setRestaurantTemplate = createAsyncThunk(
    `${preName}/setRestaurantTemplate`,
    async (templateId) => {
        const response = await AxiosConfigs.put(
            apiPath.updateTemplate,
            {},
            { params: { templateId } }
        );
        const data = await response.data;
        return data;
    }
);

const restaurantSlice = createSlice({
    name: preName,
    initialState: null,
    reducers: {
        resetRestaurant: () => null,
        newRestaurant: {
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
        [getRestaurant.fulfilled]: (state, action) => action.payload,
        [addRestaurant.fulfilled]: (state, action) => action.payload,
        [saveRestaurant.fulfilled]: (state, action) => action.payload,
        [removeRestaurant.fulfilled]: (state, action) => null,
        [setRestaurantTemplate.fulfilled]: (state, action) => null,
    },
});

export const { newRestaurant, resetRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
