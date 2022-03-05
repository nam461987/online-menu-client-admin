/* eslint-disable prettier/prettier */
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import commonReducer from "app/main/shared/store";
import { useSelector } from "react-redux";
import reducer from "../store";
import ListHeader from "./ListHeader";
import ListTable from "./ListTable";
import {
    getMenuPrices,
    selectMenuPrices,
    removeMenuPrices,
} from "../store/menuPricesSlice";
import obj from "./configs/config";
import scope from "../reducerConfig";

function MenuPrices() {
    const paging = useSelector(
        (state) => state[scope.reducerName].menuPrices.page
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
                    getItems={getMenuPrices}
                    selectItems={selectMenuPrices}
                    removeItems={removeMenuPrices}
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
)(withReducer(scope.reducerName, reducer)(MenuPrices));
