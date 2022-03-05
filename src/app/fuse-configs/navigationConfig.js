/* eslint-disable prettier/prettier */
import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
    // {
    //     id: "applications",
    //     title: "Applications",
    //     translate: "APPLICATIONS",
    //     type: "group",
    //     icon: "apps",
    //     children: [
    //         {
    //             id: "dashboard-component",
    //             title: "Dashboard",
    //             translate: "DASHBOARD",
    //             type: "item",
    //             icon: "whatshot",
    //             url: "/example",
    //         },
    //     ],
    // },
    {
        id: "data",
        title: "Data",
        translate: "DATA",
        type: "group",
        icon: "format_list_numbered_two_tone",
        children: [
            {
                id: "menu-component",
                title: "Menu",
                translate: "MENU",
                type: "collapse",
                icon: "menu_book_sharp",
                authByStr: "menu_see",
                children: [
                    {
                        id: "menu-category",
                        title: "Menu Category",
                        type: "item",
                        url: "/apps/menu/menu-categories",
                        authByStr: "menu_category_create",
                    },
                    {
                        id: "menu-size",
                        title: "Menu Size",
                        type: "item",
                        url: "/apps/menu/menu-sizes",
                        authByStr: "menu_size_create",
                    },
                    {
                        id: "menu-unit",
                        title: "Menu Unit",
                        type: "item",
                        url: "/apps/menu/menu-units",
                        authByStr: "menu_unit_create",
                    },
                    {
                        id: "menu",
                        title: "Menu",
                        type: "item",
                        url: "/apps/menu/menus",
                        authByStr: "menu_create",
                    },
                ],
            },
            {
                id: "template-component",
                title: "Template",
                translate: "TEMPLATE",
                type: "collapse",
                icon: "app_settings_alt",
                authByStr: "template_see",
                children: [
                    {
                        id: "template",
                        title: "Template",
                        type: "item",
                        url: "/apps/templates",
                        authByStr: "template_list",
                    },
                ],
            },
            {
                id: "restaurant-component",
                title: "Restaurant",
                translate: "RESTAURANT",
                type: "collapse",
                icon: "deck",
                authByStr: "restaurant_see",
                children: [
                    {
                        id: "restaurant",
                        title: "Restaurant",
                        type: "item",
                        url: "/apps/restaurants",
                        authByStr: "restaurant_list",
                    },
                    {
                        id: "own-restaurant",
                        title: "Information",
                        type: "item",
                        url: "/apps/restaurant",
                        authByStr: "restaurant_update",
                    },
                    {
                        id: "qr-code",
                        title: "QR Code",
                        type: "item",
                        url: "/apps/qr-code",
                    },
                ],
            },
            {
                id: "account-component",
                title: "Account",
                translate: "ACCOUNT",
                type: "collapse",
                icon: "person_outline_two_tone",
                authByStr: "account_see",
                children: [
                    {
                        id: "account",
                        title: "Account",
                        type: "item",
                        url: "/admin/accounts",
                        authByStr: "account_list",
                    },
                    {
                        id: "group",
                        title: "Group",
                        type: "item",
                        url: "/admin/groups",
                        authByStr: "group_list",
                    },
                    {
                        id: "permission",
                        title: "Permission",
                        type: "item",
                        url: "/admin/permissions",
                        authByStr: "permission_list",
                    },
                    {
                        id: "group-permission",
                        title: "Set Permission",
                        type: "item",
                        url: "/admin/group-permissions",
                        authByStr: "group_permission_list",
                    },
                ],
            },
        ],
    },
    {
        id: "template-select",
        title: "Template",
        translate: "TEMPLATES",
        type: "group",
        icon: "apps",
        children: [
            {
                id: "template-select-component",
                title: "Set template",
                translate: "SET TEMPLATE",
                type: "item",
                icon: "book_online",
                url: "/apps/template-page",
            },
        ],
    },
];

export default navigationConfig;
