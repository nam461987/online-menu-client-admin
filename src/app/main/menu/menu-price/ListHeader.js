/* eslint-disable prettier/prettier */
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import {
    setSearchText,
    resetSearchText,
} from "app/main/shared/store/searchTextSlice";
import { useEffect } from "react";

function ListHeader(props) {
    const dispatch = useDispatch();
    const searchText = useSelector(({ common }) => common.searchText);
    const mainTheme = useSelector(selectMainTheme);
    const { obj } = props;
    const routeParams = useParams();
    const { menuId } = routeParams;
    const theme = useTheme();

    // reset searchText once after page load
    useEffect(() => {
        dispatch(resetSearchText());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
            >
                <Typography
                    className="flex items-center sm:mb-12"
                    component={Link}
                    role="button"
                    to={`/apps/menu/menus/${menuId}`}
                    color="inherit"
                >
                    <Icon className="text-24 md:text-32">
                        {theme.direction === "ltr"
                            ? "arrow_back"
                            : "arrow_forward"}
                    </Icon>
                    <span className="hidden sm:flex text-16 md:text-24 mx-4 font-medium">
                        Menu
                    </span>
                </Typography>
            </motion.div>

            <div className="flex flex-1 items-center justify-center px-12">
                <ThemeProvider theme={mainTheme}>
                    <Paper
                        component={motion.div}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: { delay: 0.2 },
                        }}
                        className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
                    >
                        <Icon color="action">search</Icon>

                        <Input
                            placeholder="Search"
                            className="flex flex-1 mx-8"
                            disableUnderline
                            fullWidth
                            value={searchText}
                            inputProps={{
                                "aria-label": "Search",
                            }}
                            onChange={(ev) => dispatch(setSearchText(ev))}
                        />
                    </Paper>
                </ThemeProvider>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            >
                <Button
                    component={Link}
                    to={`${obj.baseRoute}${menuId}/new`}
                    className="whitespace-nowrap"
                    variant="contained"
                    color="secondary"
                >
                    <span className="hidden sm:flex">
                        Add New {obj.appName}
                    </span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </motion.div>
        </div>
    );
}

export default ListHeader;
