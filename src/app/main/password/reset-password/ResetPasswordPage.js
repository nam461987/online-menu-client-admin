/* eslint-disable prettier/prettier */
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import firebaseService from "app/services/firebaseService";
import customService from "app/services/customService";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import Constants from "app/common/constants/constants";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    password: yup
        .string()
        .required("Please enter your password.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
    password: "",
    passwordConfirm: "",
};

function ResetPasswordPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { search } = window.location;
    const params = new URLSearchParams(search);
    const code = params.get("oobCode");

    const { control, formState, handleSubmit, reset, getValues } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    const onSubmit = async () => {
        if (!firebaseService.auth) {
            console.warn(
                "Firebase Service didn't initialize, check your configuration"
            );

            return () => false;
        }
        // get email from Firebase
        const email = await firebaseService.auth
            .verifyPasswordResetCode(code)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                dispatch(
                    showMessage({
                        message: error.message,
                        variant: Constants.VARIANT.ERROR,
                    })
                );

                return () => false;
            });

        return firebaseService.auth
            .confirmPasswordReset(code, getValues("password"))
            .then(() => {
                // update password on own db as well
                customService.updatePassword(email, getValues("password"));

                dispatch(
                    showMessage({
                        message: "Password has been reset!",
                        variant: Constants.VARIANT.SUCCESS,
                    })
                );

                history.push("/login");
            })
            .catch((error) => {
                dispatch(
                    showMessage({
                        message: error.message,
                        variant: Constants.VARIANT.ERROR,
                    })
                );
            });
    };

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
                                Reset your password
                            </Typography>

                            <form
                                name="resetForm"
                                noValidate
                                className="flex flex-col justify-center w-full"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-16"
                                            label="Password"
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
                                            label="Password (Confirm)"
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
                                    Reset my password
                                </Button>
                            </form>

                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <Link className="font-normal" to="/login">
                                    Go back to login
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
