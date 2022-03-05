/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import qs from "qs";
import obj from "../group/configs/config";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/group`;

export const getGroups = createAsyncThunk(
    `${preName}/getGroups`,
    async (args) => {
        const response = await AxiosConfigs.get(Constants.API_GROUP.group, {
            params: args,
        });
        const data = await response.data;
        return data;
    }
);

export const removeGroups = createAsyncThunk(
    `${preName}/removeGroups`,
    async (arr, { dispatch, getState }) => {
        const response = await AxiosConfigs.put(
            Constants.API_GROUP.arrayActive,
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

const groupsAdapter = createEntityAdapter({
    selectId: (item) => item[obj.primaryKey],
});

export const { selectAll: selectGroups, selectById: selectGroupById } =
    groupsAdapter.getSelectors((state) => state[scope.reducerName].groups);

const groupsSlice = createSlice({
    name: preName,
    initialState: groupsAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [getGroups.fulfilled]: (state, action) => {
            groupsAdapter.setAll(state, action.payload.Items);
            state.page = {
                PageIndex: action.payload.PageIndex,
                TotalItems: action.payload.TotalItems,
                TotalPages: action.payload.TotalPages,
            };
        },
        [removeGroups.fulfilled]: (state, action) =>
            groupsAdapter.setMany(state, action.payload),
    },
});

export default groupsSlice.reducer;
