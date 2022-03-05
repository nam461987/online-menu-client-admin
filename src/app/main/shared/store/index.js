/* eslint-disable prettier/prettier */
import { combineReducers } from "@reduxjs/toolkit";
import searchText from "./searchTextSlice";
import option from "./optionSlice";

const reducer = combineReducers({
    searchText,
    option,
});

export default reducer;
