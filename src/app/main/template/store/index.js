/* eslint-disable prettier/prettier */
import { combineReducers } from "@reduxjs/toolkit";
import template from "./templateSlice";
import templates from "./templatesSlice";
import templateSelection from "./templateSelectionSlice";

const reducer = combineReducers({
    template,
    templates,
    templateSelection,
});

export default reducer;
