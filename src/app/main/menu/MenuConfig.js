/* eslint-disable prettier/prettier */
import { lazy } from "react";

const MenuConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: "/apps/menu/menu-categories/:id/:handle?",
            component: lazy(() => import("./menu-category/MenuCategory")),
        },
        {
            path: "/apps/menu/menu-categories",
            authByStr: "menu_category_list",
            component: lazy(() => import("./menu-category/MenuCategories")),
        },
        {
            path: "/apps/menu/menu-sizes/:id/:handle?",
            component: lazy(() => import("./menu-size/MenuSize")),
        },
        {
            path: "/apps/menu/menu-sizes",
            authByStr: "menu_size_list",
            component: lazy(() => import("./menu-size/MenuSizes")),
        },
        {
            path: "/apps/menu/menu-units/:id/:handle?",
            component: lazy(() => import("./menu-unit/MenuUnit")),
        },
        {
            path: "/apps/menu/menu-units",
            authByStr: "menu_unit_list",
            component: lazy(() => import("./menu-unit/MenuUnits")),
        },
        {
            path: "/apps/menu/menus/:id/:handle?",
            component: lazy(() => import("./menu/Menu")),
        },
        {
            path: "/apps/menu/menus",
            authByStr: "menu_list",
            component: lazy(() => import("./menu/Menus")),
        },
        {
            path: "/apps/menu/menu-prices/:menuId/:id/:handle?",
            component: lazy(() => import("./menu-price/MenuPrice")),
        },
        {
            path: "/apps/menu/menu-prices/:menuId",
            authByStr: "menu_price_list",
            component: lazy(() => import("./menu-price/MenuPrices")),
        },
    ],
};

export default MenuConfig;
