/* eslint-disable prettier/prettier */
import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import { useRef } from "react";
import TemplateList from "./TemplateList";
import TemplatesHeader from "./TemplatesHeader";
import TemplateDialog from "./TemplateDialog";
import reducer from "../store";
import scope from "../reducerConfig";

function TemplatesPage(props) {
    const pageLayout = useRef(null);

    return (
        <>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-16 sm:p-24 pb-80",
                    content: "flex min-h-full",
                    leftSidebar: "w-256 border-0",
                    header: "min-h-72 h-72",
                }}
                header={<TemplatesHeader pageLayout={pageLayout} />}
                content={
                    <div className="flex flex-col w-full items-center mt-5">
                        <TemplateDialog />
                        <TemplateList />
                    </div>
                }
                sidebarInner
                ref={pageLayout}
            />
        </>
    );
}

export default withReducer(scope.reducerName, reducer)(TemplatesPage);
