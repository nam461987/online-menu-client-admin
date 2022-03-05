/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import _ from "@lodash";
import { uploadToGlobal } from "app/common/functions/upload";
import { showMessage } from "app/store/fuse/messageSlice";
import Constants from "app/common/constants/constants";

function FormHeader(props) {
    const dispatch = useDispatch();
    const { add, save, remove, obj } = props;
    const methods = useFormContext();
    const { formState, watch, getValues } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch(obj.urlName);
    const theme = useTheme();
    const history = useHistory();

    async function handleSaveItem() {
        let files = getValues("files");
        const priKey = getValues(obj.primaryKey);
        // check if object is not empty
        // then modify upload-type field
        if (Object.keys(obj).length !== 0) {
            await uploadImage(files).then((response) => {
                files = response;
            });
        }

        // consider save or add method by Form primary key
        if (!priKey || priKey?.length === 0) {
            dispatch(add({ ...getValues(), ...files })).then((response) => {
                if (response.payload) {
                    dispatch(
                        showMessage({
                            message: Constants.MODAL.ADD_DATA_SUCCESS,
                            variant: Constants.VARIANT.SUCCESS,
                        })
                    );
                    history.push(obj.baseRoute);
                } else {
                    dispatch(
                        showMessage({
                            message: Constants.MODAL.ADD_DATA_FAIL,
                            variant: Constants.VARIANT.ERROR,
                        })
                    );
                }
            });
        } else {
            dispatch(save({ ...getValues(), ...files })).then((response) => {
                if (response.payload) {
                    dispatch(
                        showMessage({
                            message: Constants.MODAL.SAVE_DATA_SUCCESS,
                            variant: Constants.VARIANT.SUCCESS,
                        })
                    );
                } else {
                    dispatch(
                        showMessage({
                            message: Constants.MODAL.SAVE_DATA_FAIL,
                            variant: Constants.VARIANT.ERROR,
                        })
                    );
                }
            });
        }
    }

    function handleRemoveProduct() {
        dispatch(remove()).then((response) => {
            if (response.payload) {
                dispatch(
                    showMessage({
                        message: Constants.MODAL.SET_STATUS_SUCCESS,
                        variant: Constants.VARIANT.SUCCESS,
                    })
                );
                history.push(obj.baseRoute);
            } else {
                dispatch(
                    showMessage({
                        message: Constants.MODAL.SET_STATUS_FAIL,
                        variant: Constants.VARIANT.ERROR,
                    })
                );
            }
        });
    }

    const uploadImage = async (files) => {
        const results = [];
        Object.entries(files).forEach(([key, value]) => {
            if (typeof files[key] !== "function") {
                results.push(
                    fileUpload(files[key]).then((response) => {
                        files[key] = response.data;
                    })
                );
            }
        });

        await Promise.all(results);

        return files;
    };

    const fileUpload = (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return uploadToGlobal(formData);
    };

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to={obj.baseRoute}
                        color="inherit"
                    >
                        <Icon className="text-20">
                            {theme.direction === "ltr"
                                ? "arrow_back"
                                : "arrow_forward"}
                        </Icon>
                        <span className="hidden sm:flex mx-4 font-medium">
                            {obj.appName}
                        </span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <motion.div
                        className="hidden sm:flex"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 0.3 } }}
                    >
                        <img
                            className="w-32 sm:w-48 rounded"
                            src="assets/images/ecommerce/product-image-placeholder.png"
                            alt={name}
                        />
                    </motion.div>
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.3 } }}
                        >
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {name || `New ${obj.appName}`}
                            </Typography>
                            <Typography
                                variant="caption"
                                className="font-medium"
                            >
                                {obj.appName} Detail
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                {getValues(obj.primaryKey) ? (
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        onClick={handleRemoveProduct}
                        startIcon={
                            <Icon className="hidden sm:flex">delete</Icon>
                        }
                    >
                        {getValues("Status") != 0 ? "Remove" : "Active"}
                    </Button>
                ) : null}
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveItem}
                >
                    Save
                </Button>
            </motion.div>
        </div>
    );
}

export default FormHeader;
