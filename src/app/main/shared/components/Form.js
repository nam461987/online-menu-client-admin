/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
import { useState, useEffect, useRef } from "react";
import {
    TextField,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    IconButton,
    Select,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import { showMessage } from "app/store/fuse/messageSlice";
import Constants from "app/common/constants/constants";
import { makeStyles } from "@material-ui/core/styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import MyUploadAdapter, {
    editorConfiguration,
} from "app/common/functions/upload";
import "app/common/css/custom.css";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {
    getOptionsByKey,
    getOptionsByDependId,
} from "app/main/shared/store/optionSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    input: {
        display: "none",
    },
}));

function Form(props) {
    const methods = useFormContext();
    const { control, formState, getValues, setValue } = methods;
    const { errors } = formState;
    const { obj, isNew } = props;
    const [file, setFile] = useState({});
    const classes = useStyles();
    const options = useSelector(({ common }) => {
        return common.option;
    });
    const permissions = useSelector(({ auth }) => auth.user.permissions);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleUploadChange = (e, field) => {
        const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        if (e.target.files.length > 0) {
            if (types.every((type) => e.target.files[0].type !== type)) {
                showMessage({
                    message: Constants.MODAL.WRONG_FILE_TYPE,
                    variant: Constants.VARIANT.ERROR,
                });
            } else {
                setFile({ ...file, [field]: e.target.files[0] });
            }
        }
    };

    useEffect(() => {
        if (isNew) {
            if (!permissions.includes(obj.addNewPermission)) {
                history.push({
                    pathname: Constants.PAGE.DENY_PAGE,
                });
            }
        } else if (!permissions.includes(obj.updatePermission)) {
            history.push({
                pathname: Constants.PAGE.DENY_PAGE,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue("files", file);
    }, [setValue, file]);

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            for (let i = 0; i < obj.fields.length; i++) {
                if (
                    (obj.fields[i].type == "select" ||
                        obj.fields[i].type == "select2") &&
                    !obj.fields[i].depend
                ) {
                    if (
                        !options?.[`options_${obj.fields[i].field}_array`] &&
                        !options?.[
                            `options_${obj.fields[i].field}_${obj.fields[i].option}`
                        ]
                    ) {
                        dispatch(
                            getOptionsByKey({
                                fieldName: obj.fields[i].field,
                                optionUrl: obj.fields[i].option,
                            })
                        );
                    }
                }
            }
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            // auto get depend option list in update item mode
            for (let i = 0; i < obj.fields.length; i++) {
                if (obj.fields[i].depend) {
                    dispatch(
                        getOptionsByDependId({
                            fieldName: obj.fields[i].field,
                            optionUrl:
                                typeof obj.fields[i].option == "string"
                                    ? obj.fields[i].option
                                    : obj.fields[i].option(
                                          getValues(obj.fields[i].depend)
                                      ),
                            id: getValues(obj.fields[i].depend),
                        })
                    );
                }
            }
        }
    }, [dispatch, mounted.current]);

    const handleSelectChange = (e, name) => {
        for (let i = 0; i < obj.fields.length; i++) {
            if (name == obj.fields[i].depend) {
                dispatch(
                    getOptionsByDependId({
                        fieldName: obj.fields[i].field,
                        optionUrl:
                            typeof obj.fields[i].option == "string"
                                ? obj.fields[i].option
                                : obj.fields[i].option(e.target.value),
                        id: e.target.value,
                    })
                );
            }
        }
    };

    return (
        <div className="p-16 sm:p-24 max-w-2xl">
            {obj.fields &&
                obj.fields
                    .filter((f) => (isNew ? f.create : f.edit))
                    .map((f) => {
                        switch (f.type) {
                            case "hidden": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors[f.field]}
                                                {...f.required}
                                                helperText={
                                                    errors?.[f.field]?.message
                                                }
                                                label={f.label}
                                                {...f.autoFocus}
                                                id={f.field}
                                                variant="outlined"
                                                fullWidth
                                                hidden
                                            />
                                        )}
                                    />
                                );
                            }
                            case "date": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                type="date"
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors[f.field]}
                                                {...f.required}
                                                helperText={
                                                    errors?.[f.field]?.message
                                                }
                                                label={f.label}
                                                {...f.autoFocus}
                                                id={f.field}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    readOnly: isNew
                                                        ? false
                                                        : f.readOnly,
                                                }}
                                                fullWidth
                                            />
                                        )}
                                    />
                                );
                            }
                            case "time": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                type="time"
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors[f.field]}
                                                {...f.required}
                                                helperText={
                                                    errors?.[f.field]?.message
                                                }
                                                label={f.label}
                                                {...f.autoFocus}
                                                id={f.field}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    step: 300, // 5 min
                                                    readOnly: isNew
                                                        ? false
                                                        : f.readOnly,
                                                }}
                                                fullWidth
                                            />
                                        )}
                                    />
                                );
                            }
                            case "datetime": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                type="datetime-local"
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors[f.field]}
                                                {...f.required}
                                                helperText={
                                                    errors?.[f.field]?.message
                                                }
                                                label={f.label}
                                                {...f.autoFocus}
                                                id={f.field}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    readOnly: isNew
                                                        ? false
                                                        : f.readOnly,
                                                }}
                                                fullWidth
                                            />
                                        )}
                                    />
                                );
                            }
                            case "password": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                type="password"
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors[f.field]}
                                                {...f.required}
                                                helperText={
                                                    errors?.[f.field]?.message
                                                }
                                                label={f.label}
                                                {...f.autoFocus}
                                                id={f.field}
                                                variant="outlined"
                                                InputProps={{
                                                    readOnly: isNew
                                                        ? false
                                                        : f.readOnly,
                                                }}
                                                fullWidth
                                            />
                                        )}
                                    />
                                );
                            }
                            case "number": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                type="number"
                                                min="0"
                                                step="1"
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors[f.field]}
                                                {...f.required}
                                                helperText={
                                                    errors?.[f.field]?.message
                                                }
                                                label={f.label}
                                                {...f.autoFocus}
                                                id={f.field}
                                                variant="outlined"
                                                InputProps={{
                                                    readOnly: isNew
                                                        ? false
                                                        : f.readOnly,
                                                }}
                                                fullWidth
                                            />
                                        )}
                                    />
                                );
                            }
                            case "textarea": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                type="text"
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors[f.field]}
                                                {...f.required}
                                                helperText={
                                                    errors?.[f.field]?.message
                                                }
                                                label={f.label}
                                                {...f.autoFocus}
                                                id={f.field}
                                                multiline
                                                rows={5}
                                                variant="outlined"
                                                InputProps={{
                                                    readOnly: isNew
                                                        ? false
                                                        : f.readOnly,
                                                }}
                                                fullWidth
                                            />
                                        )}
                                    />
                                );
                            }
                            case "select":
                            case "select2": {
                                const filterOptions =
                                    typeof f.option == "string"
                                        ? options?.[
                                              `options_${f.field}_${f.option}`
                                          ]
                                        : options?.[`options_${f.field}_array`];
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl
                                                variant="outlined"
                                                fullWidth
                                                className={classes.formControl}
                                            >
                                                <InputLabel
                                                    id={`select-label-${f.field}`}
                                                >
                                                    {f.label}
                                                </InputLabel>
                                                <Select
                                                    labelId={`select-label-${f.field}`}
                                                    id={`select-select-${f.field}`}
                                                    className="mt-8 mb-16"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSelectChange(
                                                            e,
                                                            f.field
                                                        );
                                                    }}
                                                    {...f.required}
                                                    value={
                                                        getValues(f.field) ?? ""
                                                    }
                                                >
                                                    {isNew ? (
                                                        <MenuItem value="">
                                                            <em>
                                                                --Select{" "}
                                                                {`${f.label}`}
                                                                --
                                                            </em>
                                                        </MenuItem>
                                                    ) : null}
                                                    {filterOptions?.map((o) => (
                                                        <MenuItem
                                                            key={o.Value}
                                                            value={o.Value}
                                                        >
                                                            <em>
                                                                {o.DisplayText}
                                                            </em>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                );
                            }
                            case "checkbox": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl component="fieldset">
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    field.value ==
                                                                    1
                                                                }
                                                            />
                                                        }
                                                        label={f.label}
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        )}
                                    />
                                );
                            }
                            case "upload": {
                                return (
                                    <div className="flex -mx-4" key={f.field}>
                                        <Controller
                                            name={f.field}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    className="mt-8 mb-16 mx-4"
                                                    error={!!errors[f.field]}
                                                    {...f.required}
                                                    helperText={
                                                        errors?.[f.field]
                                                            ?.message
                                                    }
                                                    label={f.label}
                                                    {...f.autoFocus}
                                                    id={f.field}
                                                    inputProps={{
                                                        readOnly: f.readOnly,
                                                    }}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            onChange={(event) =>
                                                handleUploadChange(
                                                    event,
                                                    f.field
                                                )
                                            }
                                            name={`"file.${f.field}"`}
                                            id={`"icon-button-file-${f.field}"`}
                                            type="file"
                                        />
                                        <label
                                            className="mt-8 mb-16 mx-4"
                                            htmlFor={`"icon-button-file-${f.field}"`}
                                        >
                                            <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                            >
                                                <PhotoCameraIcon fontSize="large" />
                                            </IconButton>
                                        </label>
                                        {getValues(f.field) && (
                                            <div className="mx-4">
                                                <img
                                                    className="w-64 m-4"
                                                    src={
                                                        obj.gObj.mainProject +
                                                        getValues(f.field)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            case "editor": {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <CKEditor
                                                {...field}
                                                editor={ClassicEditor}
                                                config={editorConfiguration}
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.
                                                    editor.plugins.get(
                                                        "FileRepository"
                                                    ).createUploadAdapter = (
                                                        loader
                                                    ) => {
                                                        return new MyUploadAdapter(
                                                            loader
                                                        );
                                                    };
                                                }}
                                                onChange={(value, editor) =>
                                                    setValue(
                                                        f.field,
                                                        editor.getData()
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                );
                            }
                            default: {
                                return (
                                    <Controller
                                        key={f.field}
                                        name={f.field}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mt-8 mb-16"
                                                error={!!errors[f.field]}
                                                {...f.required}
                                                helperText={
                                                    errors?.[f.field]?.message
                                                }
                                                label={f.label}
                                                {...f.autoFocus}
                                                id={f.field}
                                                InputProps={{
                                                    readOnly: isNew
                                                        ? false
                                                        : f.readOnly,
                                                }}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                );
                            }
                        }
                    })}
        </div>
    );
}

export default Form;
