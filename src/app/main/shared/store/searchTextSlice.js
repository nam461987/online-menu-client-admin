/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const searchTextSlice = createSlice({
    name: "common",
    initialState: "",
    reducers: {
        setSearchText: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({ payload: event.target.value || "" }),
        },
        resetSearchText: {
            reducer: (state, action) => "",
        },
    },
});

export const { setSearchText, resetSearchText } = searchTextSlice.actions;

export default searchTextSlice.reducer;
