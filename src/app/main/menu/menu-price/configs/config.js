/* eslint-disable prettier/prettier */
import gObj from "app/common/global-objects/globalObjects";

const obj = {};

obj.gObj = gObj;

obj.primaryKey = "Id";
obj.appName = "Menu Price";
obj.baseRoute = "/apps/menu/menu-prices/";
obj.urlName = "SizeIdName";
obj.icon = "clear_all_sharp";
obj.addNewPermission = "menu_price_create";
obj.updatePermission = "menu_price_update";
obj.deletePermission = "menu_price_delete";

obj.defaultConfig = gObj.defaultConfig;

obj.ApiKey = "";
obj.currentTable = "";

obj.fields = [
    {
        field: "Id",
        label: "#",
        create: false,
        edit: true,
        list: false,
        type: "hidden",
        align: "left",
        disablePadding: true,
        sort: false,
        required: true,
    },
    {
        field: "MenuId",
        label: "Menu",
        create: true,
        edit: true,
        list: false,
        type: "hidden",
        align: "left",
        disablePadding: false,
        sort: true,
    },
    {
        field: "SizeId",
        label: "Size",
        view: "Name",
        create: true,
        edit: true,
        list: true,
        type: "select",
        option: "/option/getmenusize",
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "Price",
        label: "Price",
        create: true,
        edit: true,
        list: true,
        type: "number",
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "Status",
        label: "active",
        create: false,
        edit: false,
        list: true,
        type: "active",
        align: "right",
        disablePadding: false,
        sort: true,
    },
];

export default obj;
