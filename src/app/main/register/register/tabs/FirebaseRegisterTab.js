/* eslint-disable prettier/prettier */
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    registerWithFirebase,
    registerWithFirebaseAndDBOwner,
} from "app/auth/store/registerSlice";
import * as yup from "yup";
import _ from "@lodash";
import { getOptionsByKey } from "app/main/shared/store/optionSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    typeId: yup
        .number("You must select one")
        .required("You must select type of business"),
    displayName: yup.string().required("You must enter display name"),
    email: yup
        .string()
        .email("You must enter a valid email")
        .required("You must enter a email"),
    password: yup
        .string()
        .required("Please enter your password.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
    typeId: "",
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
};

function FirebaseRegisterTab(props) {
    const dispatch = useDispatch();
    const authRegister = useSelector(({ auth }) => auth.register);
    const restaurantTypes = useSelector(({ common }) => {
        return common.option?.["options_TypeId_firebase/getrestauranttype"];
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    const { control, formState, handleSubmit, reset, setError, getValues } =
        useForm({
            mode: "onChange",
            defaultValues,
            resolver: yupResolver(schema),
        });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        // do componentDidMount logic

        dispatch(
            getOptionsByKey({
                fieldName: "TypeId",
                optionUrl: "firebase/getrestauranttype",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        authRegister.errors.forEach((error) => {
            setError(error.type, {
                type: "manual",
                message: error.message,
            });
        });
    }, [authRegister.errors, setError]);

    function onSubmit(model) {
        dispatch(registerWithFirebaseAndDBOwner(model));
    }

    console.log(restaurantTypes);

    return (
        <div className="w-full">
            <form
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="typeId"
                    control={control}
                    render={({ field }) => (
                        <FormControl
                            variant="outlined"
                            fullWidth
                            className="mb-16"
                        >
                            <InputLabel id="select-label-TypeId">
                                Type of Business *
                            </InputLabel>
                            <Select
                                labelId="select-label-TypeId"
                                id="select-select-TypeId"
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                                value={getValues("typeId") ?? ""}
                                required
                                error={!!errors.typeId}
                            >
                                <MenuItem value="">
                                    <em>--Select Type --</em>
                                </MenuItem>
                                {restaurantTypes?.map((o) => (
                                    <MenuItem key={o.Value} value={o.Value}>
                                        <em>{o.DisplayText}</em>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="displayName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-16"
                            type="text"
                            label="Display name"
                            error={!!errors.displayName}
                            helperText={errors?.displayName?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon
                                            className="text-20"
                                            color="action"
                                        >
                                            person
                                        </Icon>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            required
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-16"
                            type="text"
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            label="Email"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon
                                            className="text-20"
                                            color="action"
                                        >
                                            email
                                        </Icon>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            required
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
                            type="password"
                            label="Password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon
                                            className="text-20"
                                            color="action"
                                        >
                                            vpn_key
                                        </Icon>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            required
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
                            type="password"
                            label="Confirm Password"
                            error={!!errors.passwordConfirm}
                            helperText={errors?.passwordConfirm?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon
                                            className="text-20"
                                            color="action"
                                        >
                                            vpn_key
                                        </Icon>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            required
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16"
                    aria-label="REGISTER"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    value="legacy"
                >
                    Register
                </Button>
            </form>
        </div>
    );
}

export default FirebaseRegisterTab;
