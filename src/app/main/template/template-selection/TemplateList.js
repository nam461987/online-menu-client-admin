/* eslint-disable prettier/prettier */
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import TemplateListItem from "./TemplateListItem";
import {
    getTemplateSelection,
    selectTemplateSelection,
} from "../store/templateSelectionSlice";

function TemplateList(props) {
    const dispatch = useDispatch();
    const templates = useSelector(selectTemplateSelection);
    const [data, setData] = useState(templates);
    const [loading, setLoading] = useState(true);
    const templateId = useSelector(({ auth }) => auth.user.templateId);

    useEffect(() => {
        dispatch(getTemplateSelection()).then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (templateId) {
            // Move the template that user has selected to the first

            const sorted = [
                ...templates.filter(({ Id }) => Id === templateId),
                ...templates.filter(({ Id }) => Id !== templateId),
            ];

            setData(sorted);
        } else {
            setData(templates);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templates, templateId]);

    if (loading) {
        return <FuseLoading />;
    }

    return !templates || templates.length === 0 ? (
        <div className="flex items-center justify-center h-full">
            <Typography color="textSecondary" variant="h5">
                There are no templates!
            </Typography>
        </div>
    ) : (
        <div className="flex flex-wrap w-full">
            <Masonry
                breakpointCols={{
                    default: 6,
                    1920: 5,
                    1600: 4,
                    1366: 3,
                    1280: 4,
                    960: 3,
                    600: 2,
                    480: 1,
                }}
                className="my-masonry-grid flex w-full"
                columnClassName="my-masonry-grid_column flex flex-col p-0 md:p-8"
            >
                {data &&
                    data.map((template) => (
                        <TemplateListItem
                            key={template.Id}
                            template={template}
                            className="w-full rounded-20 shadow mb-16"
                            selected={template.Id === templateId}
                        />
                    ))}
            </Masonry>
        </div>
    );
}

export default withRouter(TemplateList);
