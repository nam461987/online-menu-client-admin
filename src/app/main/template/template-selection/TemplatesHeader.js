/* eslint-disable prettier/prettier */
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";

function TemplatesHeader(props) {
    return (
        <div className="flex flex-1 items-center justify-between p-8 sm:p-24 relative">
            <div className="flex flex-shrink items-center sm:w-224">
                <div className="flex items-center">
                    <Icon
                        component={motion.span}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 0.2 } }}
                        className="text-24 md:text-32"
                    >
                        app_settings_alt
                    </Icon>
                    <Typography
                        component={motion.span}
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.2 } }}
                        delay={300}
                        className="text-16 md:text-24 mx-12 font-semibold"
                    >
                        Templates
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default TemplatesHeader;
