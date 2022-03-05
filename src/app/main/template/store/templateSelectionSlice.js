/* eslint-disable prettier/prettier */
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";
import scope from "../reducerConfig";

const preName = `${scope.reducerName}/templateSelection`;
const apiPath = Constants.API_TEMPLATE;

export const getTemplateSelection = createAsyncThunk(
    `${preName}/getTemplateSelection`,
    async () => {
        const response = await AxiosConfigs.get(apiPath.getAllWithOutPaging);
        const data = await response.data;
        return data;
    }
);

const templateSelectionAdapter = createEntityAdapter({
    selectId: (item) => item.Id,
});

export const {
    selectAll: selectTemplateSelection,
    selectById: selectTemplateSelectionById,
} = templateSelectionAdapter.getSelectors(
    (state) => state[scope.reducerName].templateSelection
);

const templateSelectionSlice = createSlice({
    name: preName,
    initialState: templateSelectionAdapter.getInitialState({
        templateDialogId: null,
    }),
    reducers: {
        openTemplateDialog: (state, action) => {
            state.templateDialogId = action.payload;
        },
        closeTemplateDialog: (state, action) => {
            state.templateDialogId = action.null;
        },
    },
    extraReducers: {
        [getTemplateSelection.fulfilled]: (state, action) =>
            templateSelectionAdapter.setAll(state, action.payload),
    },
});

export const { openTemplateDialog, closeTemplateDialog } =
    templateSelectionSlice.actions;

export default templateSelectionSlice.reducer;
