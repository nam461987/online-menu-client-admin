/* eslint-disable prettier/prettier */
import { lazy } from "react";

const PasswordPageConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: false,
                },
                toolbar: {
                    display: false,
                },
                footer: {
                    display: false,
                },
                leftSidePanel: {
                    display: false,
                },
                rightSidePanel: {
                    display: false,
                },
            },
        },
    },
    routes: [
        {
            path: "/update-password",
            component: lazy(() =>
                import("./update-password/UpdatePasswordPage")
            ),
        },
        {
            path: "/forgot-password",
            component: lazy(() =>
                import("./forgot-password/ForgotPasswordPage")
            ),
        },
        {
            path: "/reset-password",
            component: lazy(() => import("./reset-password/ResetPasswordPage")),
        },
        {
            path: "/verify-email",
            component: lazy(() => import("./verify-email/VerifyEmailPage")),
        },
        {
            path: "/auth/action",
            component: lazy(() => import("./auth-action/AuthActionPage")),
        },
    ],
};

export default PasswordPageConfig;
