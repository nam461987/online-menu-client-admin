/* eslint-disable prettier/prettier */
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Button from "@material-ui/core/Button";

function TemplateDetail(props) {
    const { template } = props;

    return (
        <div className="flex flex-col w-full">
            <FuseScrollbars className="flex w-full md:h-640 h-480">
                <iframe
                    className="w-full"
                    src={template?.Url}
                    title={template?.Id}
                />
            </FuseScrollbars>

            <div className="flex flex-auto justify-end items-center px-16 pb-12">
                <div className="flex items-center">
                    <>
                        <Button
                            className="m-4 mt-10"
                            onClick={props.onClose}
                            variant="outlined"
                            size="small"
                        >
                            Close
                        </Button>
                    </>
                </div>
            </div>
        </div>
    );
}

export default TemplateDetail;
