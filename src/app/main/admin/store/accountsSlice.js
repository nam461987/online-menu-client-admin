/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../account/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/account`;

export const getAccounts = createAsyncThunk(
    `${preName}/getAccounts`,
    async (args) => {
        const response = await AxiosConfigs.get(Constants.API_ACCOUNT.account, {
            params: args,
        });
        const data = await response.data;
        return data;
    }
);

export const removeAccounts = createAsyncThunk(
    `${preName}/removeAccounts`,
    async (arr, { dispatch, getState }) => {
        const response = await AxiosConfigs.put(
            Constants.API_ACCOUNT.arrayActive,
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

const accountsAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const { selectAll: selectAccounts, selectById: selectAccountById } =
    accountsAdapter.getSelectors((state) => state[scope.reducerName].accounts);

const accountsSlice = createSlice({
    name: preName,
    initialState: accountsAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [getAccounts.fulfilled]: (state, action) => {
            accountsAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeAccounts.fulfilled]: (state, action) =>
            accountsAdapter.setMany(state, action.payload),
    },
});

export default accountsSlice.reducer;
