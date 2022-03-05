/* eslint-disable prettier/prettier */
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import commonReducer from "app/main/shared/store";
import { useSelector } from "react-redux";
import reducer from "../store";
import ListHeader from "../../shared/components/ListHeader";
import ListTable from "../../shared/components/ListTable";
import {
    getTemplates,
    selectTemplates,
    removeTemplates,
} from "../store/templatesSlice";
import obj from "./configs/config";
import scope from "../reducerConfig";

function Templates() {
    const paging = useSelector(
        (state) => state[scope.reducerName].templates.page
    );

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                contentCard: "overflow-hidden",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
            }}
            header={<ListHeader obj={obj} />}
            content={
                <ListTable
                    getItems={getTemplates}
                    selectItems={selectTemplates}
                    removeItems={removeTemplates}
                    obj={obj}
                    paging={paging}
                />
            }
            innerScroll
        />
    );
}

export default withReducer(
    "common",
    commonReducer
)(withReducer(scope.reducerName, reducer)(Templates));
