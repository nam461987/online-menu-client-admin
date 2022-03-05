/* eslint-disable prettier/prettier */
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import commonReducer from "app/main/shared/store";
import { useSelector } from "react-redux";
import reducer from "../store";
import ListHeader from "../../shared/components/ListHeader";
import ListTable from "../../shared/components/ListTable";
import {
    getMenuCategories,
    selectMenuCategories,
    removeMenuCategories,
} from "../store/menuCategoriesSlice";
import obj from "./configs/config";
import scope from "../reducerConfig";

function MenuCategories() {
    const paging = useSelector(
        (state) => state[scope.reducerName].menuCategories.page
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
                    getItems={getMenuCategories}
                    selectItems={selectMenuCategories}
                    removeItems={removeMenuCategories}
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
)(withReducer(scope.reducerName, reducer)(MenuCategories));
