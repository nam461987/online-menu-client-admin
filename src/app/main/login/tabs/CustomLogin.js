/* eslint-disable prettier/prettier */
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitLoginWithCustom } from "app/auth/store/loginSlice";
import * as yup from "yup";
import _ from "@lodash";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    username: yup.string().required("You must enter a username"),
    password: yup
        .string()
        .required("Please enter your password.")
        .min(4, "Password is too short - should be 4 chars minimum."),
});

const defaultValues = {
    username: "",
    password: "",
};

function CustomLogin(props) {
    const dispatch = useDispatch();
    const login = useSelector(({ auth }) => auth.login);
    const {
        control,
        setValue,
        formState,
        handleSubmit,
        reset,
        trigger,
        setError,
        getValues,
    } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    const [showPassword, setShowPassword] = useState(false);

    // useEffect(() => {
    //     setValue("email", "admin@fusetheme.com", {
    //         shouldDirty: true,
    //         shouldValidate: true,
    //     });
    //     setValue("password", "admin", {
    //         shouldDirty: true,
    //         shouldValidate: true,
    //     });
    // }, [reset, setValue, trigger]);

    useEffect(() => {
        login.errors?.forEach((error) => {
            setError(error.type, {
                type: "manual",
                message: error.message,
            });
        });
    }, [login.errors, setError]);

    function onSubmit(model) {
        dispatch(submitLoginWithCustom(model));
    }
    return (
        <div className="w-full">
            <form
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-16"
                            type="text"
                            error={!!errors.username}
                            helperText={errors?.username?.message}
                            label="UserName"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon
                                            className="text-20"
                                            color="action"
                                        >
                                            user
                                        </Icon>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
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
                            label="Password"
                            type="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            InputProps={{
                                className: "pr-2",
                                type: showPassword ? "text" : "password",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            <Icon
                                                className="text-20"
                                                color="action"
                                            >
                                                {showPassword
                                                    ? "visibility"
                                                    : "visibility_off"}
                                            </Icon>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            required
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16"
                    aria-label="LOG IN"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    value="legacy"
                >
                    Login
                </Button>
            </form>

            <table className="w-full mt-32 text-center">
                <thead className="mb-4">
                    <tr>
                        <th>
                            <Typography
                                className="font-semibold text-11"
                                color="textSecondary"
                            >
                                Role
                            </Typography>
                        </th>
                        <th>
                            <Typography
                                className="font-semibold text-11"
                                color="textSecondary"
                            >
                                UserName
                            </Typography>
                        </th>
                        <th>
                            <Typography
                                className="font-semibold text-11"
                                color="textSecondary"
                            >
                                Password
                            </Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Typography
                                className="font-medium text-11"
                                color="textSecondary"
                            >
                                Admin
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-11">
                                admin@fusetheme.com
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-11">admin</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography
                                className="font-medium text-11"
                                color="textSecondary"
                            >
                                Staff
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-11">
                                staff@fusetheme.com
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-11">staff</Typography>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CustomLogin;
