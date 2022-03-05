/* eslint-disable prettier/prettier */
import gObj from "app/common/global-objects/globalObjects";

const obj = {};

obj.gObj = gObj;

obj.primaryKey = "Id";
obj.appName = "Template";
obj.baseRoute = "/apps/templates/";
obj.urlName = "Name";
obj.icon = "clear_all_sharp";
obj.addNewPermission = "template_create";
obj.updatePermission = "template_update";
obj.deletePermission = "template_delete";

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
        label: "Avatar",
        create: true,
        edit: true,
        list: true,
        type: "upload",
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "Url",
        label: "Url",
        create: true,
        edit: true,
        list: true,
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
