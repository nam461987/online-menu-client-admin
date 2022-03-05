/* eslint-disable prettier/prettier */
import gObj from "app/common/global-objects/globalObjects";

const obj = {};

obj.gObj = gObj;

obj.primaryKey = "Id";
obj.appName = "Group";
obj.baseRoute = "/admin/groups/";
obj.urlName = "Name";
obj.icon = "clear_all_sharp";
obj.addNewPermission = "group_create";
obj.updatePermission = "group_update";
obj.deletePermission = "group_delete";

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
        readOnly: true,
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
        readOnly: false,
        autoFocus: true,
        placeHolder: "At least 6 characters, no white space.",
    },
    {
        field: "Code",
        label: "Code",
        create: true,
        edit: true,
        list: true,
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
        field: "CreatedDate",
        label: "Create Date",
        create: false,
        edit: false,
        list: false,
        type: "datetime",
        align: "right",
        disablePadding: false,
        sort: true,
    },
    {
        field: "Status",
        label: "Active",
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
