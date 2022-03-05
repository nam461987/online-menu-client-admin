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
    resetRestaurant,
    newRestaurant,
    getRestaurant,
    addRestaurant,
    saveRestaurant,
    removeRestaurant,
} from "../store/restaurantSlice";
import reducer from "../store";
import FormHeader from "app/main/shared/components/FormHeader";
import Form from "app/main/shared/components/Form";
import obj from "./configs/config";
import commonReducer from "app/main/shared/store";
import scope from "../reducerConfig";

/**
 * Form Validation Schema
 */
const createYupSchema = (fields) => {
    // eslint-disable-next-line no-shadow
    const schema = fields.reduce((schema, field) => {
        return field.validation
            ? { ...schema, [field.field]: field.validation }
            : schema;
    }, {});

    return yup.object().shape(schema);
};

function Restaurant(props) {
    const dispatch = useDispatch();
    const restaurant = useSelector(
        (state) => state[scope.reducerName].restaurant
    );

    const routeParams = useParams();
    const [noRestaurant, setNoRestaurant] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const methods = useForm({
        mode: "onChange",
        defaultValues: {},
        resolver: yupResolver(createYupSchema(obj.fields)),
    });
    const { reset, watch, control, formState } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        function updateRestaurantState() {
            const { id } = routeParams;
            if (id === "new") {
                /**
                 * Create New Restaurant data
                 */
                setIsNew(true);
                dispatch(newRestaurant());
            } else {
                /**
                 * Get Restaurant data
                 */
                dispatch(getRestaurant(id)).then((action) => {
                    /**
                     * If the requested Restaurant is not exist show message
                     */
                    if (!action.payload) {
                        setNoRestaurant(true);
                    }
                });
            }
        }

        updateRestaurantState();
    }, [dispatch, routeParams]);

    useEffect(() => {
        if (!restaurant) {
            return;
        }
        /**
         * Reset the form on Restaurant state changes
         */
        reset(restaurant);
    }, [restaurant, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Restaurant on component unload
             */
            dispatch(resetRestaurant());
            setNoRestaurant(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested Restaurant is not exists
     */
    if (noRestaurant) {
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
     * Wait while Restaurant data is loading and form is setted
     */
    if (
        _.isEmpty(form) ||
        (restaurant &&
            routeParams.id != restaurant[obj.primaryKey] &&
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
                        add={addRestaurant}
                        save={saveRestaurant}
                        remove={removeRestaurant}
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
)(withReducer(scope.reducerName, reducer)(Restaurant));
