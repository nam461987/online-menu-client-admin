/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../menu-unit/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/menuUnit`;

export const getMenuUnits = createAsyncThunk(
    `${preName}/getMenuUnits`,
    async (args) => {
        const response = await AxiosConfigs.get(
            Constants.API_MENU_UNIT.menuUnit,
            {
                params: args,
            }
        );
        const data = await response.data;
        return data;
    }
);

export const removeMenuUnits = createAsyncThunk(
    `${preName}/removeMenuUnits`,
    async (arr, { dispatch, getState }) => {
        const response = await AxiosConfigs.put(
            Constants.API_MENU_UNIT.arrayActive,
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

const menuUnitsAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const { selectAll: selectMenuUnits, selectById: selectMenuUnitById } =
    menuUnitsAdapter.getSelectors(
        (state) => state[scope.reducerName].menuUnits
    );

const menuUnitsSlice = createSlice({
    name: preName,
    initialState: menuUnitsAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        // [getMenuUnits.fulfilled]: menuUnitsAdapter.setAll,
        [getMenuUnits.fulfilled]: (state, action) => {
            menuUnitsAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeMenuUnits.fulfilled]: (state, action) =>
            menuUnitsAdapter.setMany(state, action.payload),
    },
});

export default menuUnitsSlice.reducer;
