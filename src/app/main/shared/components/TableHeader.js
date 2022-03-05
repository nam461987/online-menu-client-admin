/* eslint-disable prettier/prettier */
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import Constants from "app/common/constants/constants";

const useStyles = makeStyles((theme) => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper,
    },
}));

function TableHeader(props) {
    const classes = useStyles(props);
    const { selectedIds, removeItems, obj } = props;
    const user = useSelector(({ auth }) => auth.user);
    const numSelected = selectedIds.length;

    const [selectedMenu, setSelectedMenu] = useState(null);

    const dispatch = useDispatch();

    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };

    function openSelectedMenu(event) {
        setSelectedMenu(event.currentTarget);
    }

    function closeSelectedMenu() {
        setSelectedMenu(null);
    }

    const removeItemsHandle = (arr) => {
        dispatch(removeItems(arr)).then((response) => {
            if (response.payload) {
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
        <TableHead>
            <TableRow className="h-48 sm:h-64">
                <TableCell
                    padding="none"
                    className="w-40 md:w-64 text-center z-99"
                >
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < props.rowCount
                        }
                        checked={
                            props.rowCount !== 0 &&
                            numSelected === props.rowCount
                        }
                        onChange={props.onSelectAllClick}
                    />
                    {numSelected > 0 && (
                        <div
                            className={clsx(
                                "flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1",
                                classes.actionsButtonWrapper
                            )}
                        >
                            <IconButton
                                aria-owns={selectedMenu ? "selectedMenu" : null}
                                aria-haspopup="true"
                                onClick={openSelectedMenu}
                            >
                                <Icon>more_horiz</Icon>
                            </IconButton>
                            <Menu
                                id="selectedMenu"
                                anchorEl={selectedMenu}
                                open={Boolean(selectedMenu)}
                                onClose={closeSelectedMenu}
                            >
                                <MenuList>
                                    {user.permissions.includes(
                                        obj.deletePermission
                                    ) ? (
                                        <MenuItem
                                            onClick={() => {
                                                removeItemsHandle(selectedIds);
                                                props.onMenuItemClick();
                                                closeSelectedMenu();
                                            }}
                                        >
                                            <ListItemIcon className="min-w-40">
                                                <Icon>delete</Icon>
                                            </ListItemIcon>
                                            <ListItemText primary="Active/ Deactivate" />
                                        </MenuItem>
                                    ) : null}
                                </MenuList>
                            </Menu>
                        </div>
                    )}
                </TableCell>
                {obj.fields
                    .filter((row) => row.list)
                    .map((row) => {
                        return (
                            <TableCell
                                className="p-4 md:p-16"
                                key={row.label}
                                align={row.align}
                                padding={row.disablePadding ? "none" : "normal"}
                                sortDirection={
                                    props.order.field === row.field
                                        ? props.order.direction
                                        : false
                                }
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={
                                            row.align === "right"
                                                ? "bottom-end"
                                                : "bottom-start"
                                        }
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={
                                                props.order.field === row.field
                                            }
                                            direction={props.order.direction}
                                            onClick={createSortHandler(
                                                row.field
                                            )}
                                            className="font-semibold"
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;
