/* eslint-disable prettier/prettier */
import gObj from "app/common/global-objects/globalObjects";
import data from "app/common/global-objects/states+cities.json";

const obj = {};

obj.gObj = gObj;

obj.primaryKey = "Id";
obj.appName = "Account";
obj.baseRoute = "/admin/accounts/";
obj.urlName = "Email";
obj.icon = "perm_identity";
obj.addNewPermission = "account_create";
obj.updatePermission = "account_update";
obj.deletePermission = "account_delete";
obj.resendActiveEmailPermission = "account_resendactiveemail";

obj.defaultConfig = gObj.defaultConfig;

obj.ApiKey = "";
obj.currentTable = "";

obj.Gender = [
    { Value: 1, DisplayText: "Man" },
    { Value: 2, DisplayText: "Woman" },
];

const states = () => {
    const usStates = data
        .filter((c) => c.country_id === 233)
        .map((c) => {
            return {
                Value: c.id,
                DisplayText: c.name,
            };
        });
    return usStates;
};

obj.states = states;

const cities = (stateId) => {
    const usCities = data.filter((c) => c.country_id === 233);

    return usCities
        .filter((c) => c.id === stateId)[0]
        ?.cities.map((c) => {
            return { Value: c.id, DisplayText: c.name };
        });
};

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
        field: "TypeId",
        label: "Group",
        view: "Name",
        create: true,
        edit: true,
        list: true,
        type: "select",
        option: "/option/getadmingroup",
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "UserName",
        label: "User",
        create: false,
        edit: false,
        list: false,
        type: "username",
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
        readOnly: true,
        autoFocus: true,
        placeHolder: "At least 6 characters, no white space.",
    },
    {
        field: "PasswordHash",
        label: "Password",
        create: true,
        edit: false,
        list: false,
        type: "password",
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
        autoFocus: true,
        placeHolder: "At least 8 characters, no white space.",
    },
    {
        field: "Email",
        label: "Email",
        create: true,
        edit: true,
        list: true,
        type: "email",
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
        readOnly: true,
    },
    {
        field: "Mobile",
        label: "Phone",
        create: true,
        edit: true,
        list: true,
        type: "phone",
        align: "left",
        disablePadding: false,
        sort: true,
    },
    {
        field: "Home",
        label: "Home",
        create: false,
        edit: false,
        list: false,
        align: "left",
        disablePadding: false,
        sort: true,
    },
    {
        field: "FullName",
        label: "Full Name",
        create: true,
        edit: true,
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
    },
    {
        field: "BirthDate",
        label: "Birthday",
        create: true,
        edit: true,
        list: true,
        type: "datetime",
        align: "left",
        disablePadding: false,
        sort: true,
    },
    {
        field: "StateId",
        label: "State",
        view: "Name",
        create: true,
        edit: true,
        list: true,
        type: "select",
        option: obj.states(),
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "CityId",
        label: "City",
        view: "Name",
        depend: "StateId",
        create: true,
        edit: true,
        list: true,
        type: "select",
        option: cities,
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "Zip",
        label: "Zip Code",
        create: true,
        edit: true,
        list: false,
        type: "number",
        align: "right",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "Address",
        label: "Address",
        create: true,
        edit: true,
        list: false,
        align: "right",
        disablePadding: false,
        sort: true,
    },
    {
        field: "Gender",
        label: "Gender",
        create: true,
        edit: true,
        list: false,
        type: "select",
        option: obj.Gender,
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
        field: "Active",
        label: "Active",
        create: false,
        edit: false,
        list: true,
        type: "active",
        align: "center",
        disablePadding: false,
        sort: true,
    },
    {
        field: "Status",
        label: "Delete",
        create: false,
        edit: false,
        list: true,
        type: "active",
        align: "center",
        disablePadding: false,
        sort: true,
    },
];

export default obj;
