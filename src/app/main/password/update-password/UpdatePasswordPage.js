/* eslint-disable prettier/prettier */
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import AxiosConfigs from "app/common/axios/AxiosConfigs";
import Constants from "app/common/constants/constants";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    oldPassword: yup
        .string()
        .required("Please enter your old password.")
        .test(
            "checkOldPasswordIsValid",
            "The old password is wrong.",
            (value) =>
                AxiosConfigs.get(
                    `${Constants.API_ACCOUNT.checkUserName}/${value}`
                ).then(async (res) => {
                    const { isRightOldPassword } = await res.data;

                    return isRightOldPassword;
                })
        ),
    password: yup
        .string()
        .required("Please enter your password.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
    oldPassword: "",
    password: "",
    passwordConfirm: "",
};

function ResetPasswordPage() {
    const classes = useStyles();
    const history = useHistory();
    const isLogin = useSelector(({ auth }) => auth.login.success);

    // useEffect(() => {
    //     if (!isLogin) {
    //         history.push("/login");
    //     }
    // }, [isLogin, history]);

    const { control, formState, handleSubmit, reset, getValues } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
    });

    const checkOldPassword = async (oldPass) => {
        const response = await AxiosConfigs.get(
            `${Constants.API_ACCOUNT.checkUserName}/${oldPass}`
        );
    };

    const { isValid, dirtyFields, errors } = formState;

    async function onSubmit() {
        await schema.validate({ oldPassword: getValues("oldPassword") });
        alert("success");
        // reset(defaultValues);
    }

    return (
        <div
            className={clsx(
                classes.root,
                "flex flex-col flex-auto items-center justify-center p-16 sm:p-32"
            )}
        >
            <div className="flex flex-col items-center justify-center w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Card className="w-full max-w-384">
                        <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
                            <img
                                className="w-128 m-32"
                                src="assets/images/logos/nt.svg"
                                alt="logo"
                            />

                            <Typography
                                variant="h6"
                                className="mt-16 mb-24 font-semibold text-18 sm:text-24"
                            >
                                Update your password
                            </Typography>

                            <form
                                name="resetForm"
                                noValidate
                                className="flex flex-col justify-center w-full"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Controller
                                    name="oldPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-16"
                                            label="Old Password"
                                            type="password"
                                            name="oldPassword"
                                            error={!!errors.oldPassword}
                                            helperText={
                                                errors?.oldPassword?.message
                                            }
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-16"
                                            label="New Password"
                                            type="password"
                                            name="password"
                                            error={!!errors.password}
                                            helperText={
                                                errors?.password?.message
                                            }
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="passwordConfirm"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-16"
                                            label="New Password (Confirm)"
                                            type="password"
                                            error={!!errors.passwordConfirm}
                                            helperText={
                                                errors?.passwordConfirm?.message
                                            }
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="w-224 mx-auto mt-16"
                                    aria-label="Reset"
                                    disabled={
                                        _.isEmpty(dirtyFields) || !isValid
                                    }
                                    type="submit"
                                >
                                    Update my password
                                </Button>
                            </form>

                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <Button
                                    color="secondary"
                                    onClick={() => history.goBack()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
