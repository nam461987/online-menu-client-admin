/* eslint-disable prettier/prettier */
import { combineReducers } from "@reduxjs/toolkit";
import account from "./accountSlice";
import accounts from "./accountsSlice";
import group from "./groupSlice";
import groups from "./groupsSlice";
import permission from "./permissionSlice";
import permissions from "./permissionsSlice";
import groupPermission from "./groupPermissionSlice";

const reducer = combineReducers({
    account,
    accounts,
    group,
    groups,
    permission,
    permissions,
    groupPermission,
});

export default reducer;
