/* eslint-disable prettier/prettier */
import gObj from "app/common/global-objects/globalObjects";

const obj = {};

obj.gObj = gObj;

obj.primaryKey = "Id";
obj.appName = "Menu";
obj.baseRoute = "/apps/menu/menus/";
obj.urlName = "Name";
obj.icon = "clear_all_sharp";
obj.addNewPermission = "menu_create";
obj.updatePermission = "menu_update";
obj.deletePermission = "menu_delete";

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
        field: "CategoryId",
        label: "Category",
        view: "Name",
        create: true,
        edit: true,
        list: true,
        type: "select",
        option: "/option/getmenucategory",
        align: "left",
        disablePadding: false,
        sort: true,
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
        field: "UnitId",
        label: "Unit",
        view: "Name",
        create: true,
        edit: true,
        list: true,
        type: "select",
        option: "/option/getmenuunit",
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
    },
    {
        field: "Image",
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
