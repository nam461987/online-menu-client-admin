/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prettier/prettier */
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import Constants from "app/common/constants/constants";
import { showMessage } from "app/store/fuse/messageSlice";
import { setRestaurantTemplate } from "app/main/restaurant/store/restaurantSlice";
import { updateTemplate } from "app/auth/store/userSlice";
import { openTemplateDialog } from "../store/templateSelectionSlice";

function TemplateListItem(props) {
    const dispatch = useDispatch();

    const handleSelectTemplate = (templateId) => {
        dispatch(setRestaurantTemplate(templateId)).then((response) => {
            if (response.payload) {
                dispatch(updateTemplate(templateId));
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
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
        >
            <Card className={clsx("cursor-pointer", props.className)}>
                {(props.template.Avatar && props.template.Avatar !== "" && (
                    <div
                        tabIndex="0"
                        role="button"
                        onClick={() =>
                            dispatch(openTemplateDialog(props.template.Id))
                        }
                    >
                        <img
                            src={Constants.MAIN_PROJECT + props.template.Avatar}
                            className="w-full block"
                            alt="note"
                        />
                    </div>
                )) || (
                    <img
                        src="assets/images/notes/beach.jpeg"
                        className="w-full block"
                        alt="note"
                    />
                )}

                {props.template.Name && props.template.Name !== "" && (
                    <Typography className="px-20 my-16 text-14 font-semibold">
                        {props.template.Name}
                    </Typography>
                )}

                <CardActions className="justify-star pb-24">
                    <Button
                        onClick={() =>
                            dispatch(openTemplateDialog(props.template.Id))
                        }
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        startIcon={
                            <Icon className="hidden sm:flex">zoom_out_map</Icon>
                        }
                    >
                        Review
                    </Button>
                    {props.selected ? (
                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                            startIcon={
                                <Icon className="hidden sm:flex">check</Icon>
                            }
                        >
                            Selected
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                handleSelectTemplate(props.template.Id)
                            }
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="primary"
                            startIcon={
                                <Icon className="hidden sm:flex">
                                    touch_app
                                </Icon>
                            }
                        >
                            Set
                        </Button>
                    )}
                </CardActions>
            </Card>
        </motion.div>
    );
}

export default TemplateListItem;
