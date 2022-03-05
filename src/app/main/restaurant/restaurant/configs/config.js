/* eslint-disable prettier/prettier */
import gObj from "app/common/global-objects/globalObjects";
import data from "app/common/global-objects/states+cities.json";
import * as yup from "yup";

const obj = {};

obj.gObj = gObj;

obj.primaryKey = "Id";
obj.appName = "Restaurant";
obj.baseRoute = "/apps/restaurants/";
obj.urlName = "Name";
obj.icon = "clear_all_sharp";
obj.addNewPermission = "restaurant_create";
obj.updatePermission = "restaurant_update";
obj.deletePermission = "restaurant_delete";

obj.defaultConfig = gObj.defaultConfig;

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
        required: true,
    },
    {
        field: "Name",
        label: "Restaurant Name",
        create: true,
        edit: true,
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
        validation: yup.string().required(),
    },
    {
        field: "Email",
        label: "Email",
        create: true,
        edit: true,
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
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
        field: "ZipCode",
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
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "Phone",
        label: "Phone",
        create: true,
        edit: true,
        list: true,
        type: "phone",
        align: "left",
        disablePadding: false,
        sort: true,
        required: true,
    },
    {
        field: "Facebook",
        label: "Facebook",
        create: true,
        edit: true,
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
        required: false,
    },
    {
        field: "Instagram",
        label: "Instagram",
        create: true,
        edit: true,
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
        required: false,
    },
    {
        field: "Youtube",
        label: "Youtube",
        create: true,
        edit: true,
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
        required: false,
    },
    {
        field: "Twitter",
        label: "Twitter",
        create: true,
        edit: true,
        list: true,
        align: "left",
        disablePadding: false,
        sort: true,
        required: false,
    },
    {
        field: "Banner",
        label: "Banner",
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
