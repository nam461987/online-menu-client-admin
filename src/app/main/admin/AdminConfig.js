/* eslint-disable prettier/prettier */
import { lazy } from "react";

const AdminConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: "/admin/accounts/:id/:handle?",
            component: lazy(() => import("./account/Account")),
        },
        {
            path: "/admin/accounts",
            authByStr: "account_list",
            component: lazy(() => import("./account/Accounts")),
        },
        {
            path: "/admin/groups/:id/:handle?",
            component: lazy(() => import("./group/Group")),
        },
        {
            path: "/admin/groups",
            authByStr: "group_list",
            component: lazy(() => import("./group/Groups")),
        },
        {
            path: "/admin/permissions/:id/:handle?",
            component: lazy(() => import("./permission/Permission")),
        },
        {
            path: "/admin/permissions",
            authByStr: "permission_list",
            component: lazy(() => import("./permission/Permissions")),
        },
        {
            path: "/admin/group-permissions",
            authByStr: "group_permission_list",
            component: lazy(() => import("./group-permission/GroupPermission")),
        },
    ],
};

export default AdminConfig;
