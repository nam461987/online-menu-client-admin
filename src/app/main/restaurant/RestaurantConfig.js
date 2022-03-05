/* eslint-disable prettier/prettier */
import { lazy } from "react";

const RestaurantConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: "/apps/restaurants/:id/:handle?",
            component: lazy(() => import("./restaurant/Restaurant")),
        },
        {
            path: "/apps/restaurants",
            authByStr: "restaurant_list",
            component: lazy(() => import("./restaurant/Restaurants")),
        },
        {
            path: "/apps/restaurant",
            component: lazy(() => import("./restaurant/OwnRestaurant")),
        },
        {
            path: "/apps/qr-code",
            component: lazy(() => import("./qr-code-page/CodePage")),
        },
    ],
};

export default RestaurantConfig;
