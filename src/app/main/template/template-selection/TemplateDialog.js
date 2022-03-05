/* eslint-disable prettier/prettier */
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTemplateDialog } from "../store/templateSelectionSlice";
import scope from "../reducerConfig";
import TemplateDetail from "./TemplateDetail";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TemplateDialog(props) {
    const dispatch = useDispatch();
    const templates = useSelector(
        (state) => state[scope.reducerName].templateSelection
    );

    if (!templates.entities) {
        return null;
    }

    const template = templates.entities[templates.templateDialogId];

    return (
        <Dialog
            classes={{
                paper: "w-full m-24",
            }}
            TransitionComponent={Transition}
            onClose={(ev) => dispatch(closeTemplateDialog())}
            open={Boolean(templates.templateDialogId)}
        >
            <TemplateDetail
                template={template}
                onClose={(ev) => dispatch(closeTemplateDialog())}
            />
        </Dialog>
    );
}

export default TemplateDialog;
