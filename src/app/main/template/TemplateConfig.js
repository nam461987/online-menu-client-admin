/* eslint-disable prettier/prettier */
import { lazy } from "react";

const TemplateConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: "/apps/templates/:id/:handle?",
            component: lazy(() => import("./template/Template")),
        },
        {
            path: "/apps/templates",
            authByStr: "template_list",
            component: lazy(() => import("./template/Templates")),
        },
        {
            path: "/apps/template-page",
            authByStr: "template_select",
            component: lazy(() => import("./template-selection/TemplatesPage")),
        },
    ],
};

export default TemplateConfig;
