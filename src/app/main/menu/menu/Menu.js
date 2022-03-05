/* eslint-disable eqeqeq */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    resetMenu,
    newMenu,
    getMenu,
    addMenu,
    saveMenu,
    removeMenu,
} from "../store/menuSlice";
import reducer from "../store";
import FormHeader from "./FormHeader";
import Form from "app/main/shared/components/Form";
import obj from "./configs/config";
import commonReducer from "app/main/shared/store";
import scope from "../reducerConfig";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    // Code: yup
    //     .string()
    //     .required("You must enter a Code")
    //     .min(5, "The Code must be at least 5 characters"),
});

function Menu(props) {
    const dispatch = useDispatch();
    const menu = useSelector((state) => state[scope.reducerName].menu);

    const routeParams = useParams();
    const [noMenu, setNoMenu] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const methods = useForm({
        mode: "onChange",
        defaultValues: {},
        resolver: yupResolver(schema),
    });
    const { reset, watch, control, formState } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        function updateMenuState() {
            const { id } = routeParams;
            if (id === "new") {
                /**
                 * Create New Menu Size data
                 */
                setIsNew(true);
                dispatch(newMenu());
            } else {
                /**
                 * Get Menu Size data
                 */
                dispatch(getMenu(id)).then((action) => {
                    /**
                     * If the requested Menu Size is not exist show message
                     */
                    if (!action.payload) {
                        setNoMenu(true);
                    }
                });
            }
        }

        updateMenuState();
    }, [dispatch, routeParams]);

    useEffect(() => {
        if (!menu) {
            return;
        }
        /**
         * Reset the form on Menu Size state changes
         */
        reset(menu);
    }, [menu, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Menu Size on component unload
             */
            dispatch(resetMenu());
            setNoMenu(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested Menu Size is not exists
     */
    if (noMenu) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such {obj.appName.toLowerCase()}!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to={obj.baseRoute}
                    color="inherit"
                >
                    Go to {obj.appName} Page
                </Button>
            </motion.div>
        );
    }

    /**
     * Wait while Menu Size data is loading and form is setted
     */
    if (
        _.isEmpty(form) ||
        (menu &&
            routeParams.id != menu[obj.primaryKey] &&
            routeParams.id !== "new")
    ) {
        return <FuseLoading />;
    }

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
                }}
                header={
                    <FormHeader
                        add={addMenu}
                        save={saveMenu}
                        remove={removeMenu}
                        obj={obj}
                    />
                }
                content={<Form obj={obj} isNew={isNew} />}
                innerScroll
            />
        </FormProvider>
    );
}

export default withReducer(
    "common",
    commonReducer
)(withReducer(scope.reducerName, reducer)(Menu));
