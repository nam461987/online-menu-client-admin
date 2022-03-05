/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import _ from "@lodash";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Checkbox,
    Button,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import Constants from "app/common/constants/constants";
import reducer from "../store";
import {
    getGroups,
    getModules,
    getPermissions,
    updateGroupPermission,
} from "../store/groupPermissionSlice";

const useStyles = makeStyles((theme) => ({
    header: {
        background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    headerIcon: {
        position: "absolute",
        top: -64,
        left: 0,
        opacity: 0.04,
        fontSize: 512,
        width: 512,
        height: 512,
        pointerEvents: "none",
    },
    button: {
        margin: 8,
    },
    leftIcon: {
        marginRight: 8,
    },
    rightIcon: {
        marginLeft: 8,
    },
    iconSmall: {
        fontSize: 20,
    },
}));

function GroupPermission(props) {
    const dispatch = useDispatch();
    const { groups, modules, permissions } = useSelector(
        ({ account }) => account.groupPermission
    );

    const classes = useStyles(props);
    const [module, setModule] = useState("");
    const [type, setType] = useState(0);
    const [permissionChangeList, setPermissionChangeList] = useState([]);
    const [localPermissions, setLocalPermissions] = useState([]);

    useEffect(() => {
        dispatch(getGroups());
        dispatch(getModules());
    }, [dispatch]);

    useEffect(() => {
        setLocalPermissions(permissions);
    }, [permissions]);

    const handleCheck = (event, obj) => {
        const selectedIndex = permissionChangeList.findIndex(
            (x) => x.Id === obj.Id
        );
        // change status before insert to array
        obj.Status = obj.Status === 1 ? 0 : 1;
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(permissionChangeList, obj);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(permissionChangeList.slice(1));
        } else if (selectedIndex === permissionChangeList.length - 1) {
            newSelected = newSelected.concat(permissionChangeList.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                permissionChangeList.slice(0, selectedIndex),
                permissionChangeList.slice(selectedIndex + 1)
            );
        }

        setPermissionChangeList(newSelected);
        const updateLocalPermissions = localPermissions.map((item) =>
            item.Id === obj.Id ? { ...item, Status: obj.Status } : item
        );
        setLocalPermissions(updateLocalPermissions);
    };

    const handleSave = () => {
        for (let i = 0; i < permissionChangeList.length; i++) {
            dispatch(
                updateGroupPermission({
                    groupId: permissionChangeList[i].Group,
                    permissionId: permissionChangeList[i].Id,
                    status: permissionChangeList[i].Status,
                })
            );
            if (i === permissionChangeList.length - 1) {
                dispatch(
                    showMessage({
                        message: Constants.MODAL.SAVE_DATA_SUCCESS,
                        variant: Constants.VARIANT.SUCCESS,
                    })
                );
                setPermissionChangeList([]);
            }
        }
    };

    const loadPermission = (groupId, mdl) => {
        if (groupId && groupId > 0 && mdl?.length > 0) {
            dispatch(getPermissions({ groupId, module: mdl }));
        }
    };

    return (
        <div className="flex flex-col flex-auto flex-shrink-0 w-full">
            <div
                className={clsx(
                    classes.header,
                    "relative overflow-hidden flex flex-shrink-0 items-center justify-center h-200 sm:h-288"
                )}
            >
                <div className="flex flex-col max-w-2xl mx-auto w-full p-24 sm:p-32">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0 } }}
                    >
                        <Typography
                            color="inherit"
                            className="text-24 sm:text-44 font-bold tracking-tight"
                        >
                            SET USER RIGHT
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.3 } }}
                    >
                        <Typography
                            color="inherit"
                            className="text-12 sm:text-14 mt-8 sm:mt-16 opacity-75 leading-tight sm:leading-loose"
                        >
                            You can set account permission by group. The users
                            can not do anything they don't have permit.
                        </Typography>
                    </motion.div>
                    {permissionChangeList.length > 0 ? (
                        <motion.div
                            className="mt-8 sm:mt-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.3 } }}
                        >
                            <Button
                                color="secondary"
                                className="whitespace-no-wrap mt-8 sm:mt-16"
                                variant="contained"
                                onClick={handleSave}
                            >
                                <SaveIcon
                                    className={`${clsx(
                                        classes.leftIcon,
                                        classes.iconSmall
                                    )} hidden sm:flex`}
                                />
                                <span className="hidden sm:flex">
                                    Save changes
                                </span>
                                <span className="flex sm:hidden">Save</span>
                            </Button>
                        </motion.div>
                    ) : null}
                </div>

                <Icon className={classes.headerIcon}> school </Icon>
            </div>
            <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
                <div className="flex flex-col flex-shrink-0 sm:flex-row justify-between py-24">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Group</FormLabel>
                        <RadioGroup
                            aria-label="Group"
                            name="group"
                            value={type}
                            onChange={(e) => {
                                loadPermission(e.target.value, module);
                                setType(e.target.value);
                            }}
                        >
                            {groups?.map((group, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        value={`${group.Id}`}
                                        control={<Radio />}
                                        label={group.Name}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Modules</FormLabel>
                        <RadioGroup
                            aria-label="Module"
                            name="module"
                            value={module}
                            onChange={(e) => {
                                loadPermission(type, e.target.value);
                                setModule(e.target.value);
                            }}
                        >
                            {modules.map((m, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        value={m.Value}
                                        control={<Radio />}
                                        label={m.DisplayText}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Permissions</FormLabel>
                        <FormGroup>
                            {localPermissions &&
                                localPermissions.map((p, index) => {
                                    const isSelected = p.Status == 1;

                                    return (
                                        <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(event) =>
                                                        handleCheck(event, {
                                                            Id: p.Id,
                                                            Group: type,
                                                            Status: p.Status,
                                                        })
                                                    }
                                                    value={`${p.Status}`}
                                                />
                                            }
                                            label={p.Description}
                                        />
                                    );
                                })}
                        </FormGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default withReducer("account", reducer)(GroupPermission);
