/* eslint-disable prettier/prettier */
import { combineReducers } from "@reduxjs/toolkit";
import restaurant from "./restaurantSlice";
import restaurants from "./restaurantsSlice";

const reducer = combineReducers({
    restaurant,
    restaurants,
});

export default reducer;
