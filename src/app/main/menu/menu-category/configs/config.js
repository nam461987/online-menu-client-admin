/* eslint-disable prettier/prettier */
import gObj from "app/common/global-objects/globalObjects";

const obj = {};

obj.gObj = gObj;

obj.primaryKey = "Id";
obj.appName = "Menu Category";
obj.baseRoute = "/apps/menu/menu-categories/";
obj.urlName = "Name";
obj.icon = "clear_all_sharp";
obj.addNewPermission = "menu_category_create";
obj.updatePermission = "menu_category_update";
obj.deletePermission = "menu_category_delete";

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
        field: "Name",
        label: "Name",
        create: true,
        edit: true,
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "Avatar",
        label: "Image",
        create: true,
        edit: true,
        list: true,
        type: "upload",
        align: "left",
        disablePadding: false,
        sort: true,
        readOnly: true,
    },
    {
        field: "OrderNumber",
        label: "Order #",
        create: true,
        edit: true,
        list: true,
        type: "number",
        align: "right",
        disablePadding: false,
        sort: true,
    },
    {
        field: "Description",
        label: "Description",
        create: true,
        edit: true,
        list: false,
        type: "textarea",
        align: "right",
        disablePadding: false,
        sort: true,
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
