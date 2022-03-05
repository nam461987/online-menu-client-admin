/* eslint-disable prettier/prettier */
import { Redirect } from "react-router-dom";
import FuseUtils from "@fuse/utils";
import ExampleConfig from "app/main/example/ExampleConfig";
import FuseLoading from "@fuse/core/FuseLoading";
import Error404Page from "app/main/404/Error404Page";
import LoginConfig from "app/main/login/LoginConfig";
import RegisterConfig from "app/main/register/RegisterConfig";
import MenuConfig from "app/main/menu/MenuConfig";
import TemplateConfig from "app/main/template/TemplateConfig";
import RestaurantConfig from "app/main/restaurant/RestaurantConfig";
import AdminConfig from "app/main/admin/AdminConfig";
import PasswordPageConfig from "app/main/password/PasswordPageConfig";
import ErrorDenyPage from "app/main/error/ErrorDenyPage";

const routeConfigs = [
    ExampleConfig,
    LoginConfig,
    RegisterConfig,
    MenuConfig,
    TemplateConfig,
    RestaurantConfig,
    AdminConfig,
    PasswordPageConfig,
];

const routes = [
    // if you want to make whole app auth protected by default change defaultAuth for example:
    // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
    // The individual route configs which has auth option won't be overridden.
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    {
        exact: true,
        path: "/",
        component: () => <Redirect to="/apps/template-page" />,
    },
    {
        path: "/loading",
        exact: true,
        component: () => <FuseLoading />,
    },
    {
        path: "/404",
        component: () => <Error404Page />,
    },
    {
        path: "/deny",
        component: () => <ErrorDenyPage />,
    },
    {
        component: () => <Redirect to="/404" />,
    },
];

export default routes;
