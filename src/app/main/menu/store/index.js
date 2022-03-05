/* eslint-disable prettier/prettier */
import { combineReducers } from "@reduxjs/toolkit";
import menuCategory from "./menuCategorySlice";
import menuCategories from "./menuCategoriesSlice";
import menuSize from "./menuSizeSlice";
import menuSizes from "./menuSizesSlice";
import menuUnit from "./menuUnitSlice";
import menuUnits from "./menuUnitsSlice";
import menu from "./menuSlice";
import menus from "./menusSlice";
import menuPrice from "./menuPriceSlice";
import menuPrices from "./menuPricesSlice";

const reducer = combineReducers({
    menuCategory,
    menuCategories,
    menuSize,
    menuSizes,
    menuUnit,
    menuUnits,
    menu,
    menus,
    menuPrice,
    menuPrices,
});

export default reducer;
