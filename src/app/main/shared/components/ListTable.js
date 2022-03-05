/* eslint-disable prettier/prettier */
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import Filters from "app/common/filters/filters";
import slugify from "slugify";
import TableHeader from "./TableHeader";

function ListTable(props) {
    const { getItems, selectItems, removeItems, obj, paging } = props;
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const searchText = useSelector(({ common }) => common.searchText);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(items);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: "asc",
        field: null,
    });

    useEffect(() => {
        dispatch(getItems({ pageIndex: page, pageSize: rowsPerPage })).then(
            () => setLoading(false)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page, rowsPerPage]);

    useEffect(() => {
        if (searchText.length !== 0) {
            setData(
                _.filter(items, (item) =>
                    item.Name.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        } else {
            setData(items);
        }
    }, [items, searchText]);

    function handleRequestSort(event, property) {
        const field = property;
        let direction = "desc";

        if (order.field === property && order.direction === "desc") {
            direction = "asc";
        }

        setOrder({
            direction,
            field,
        });
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(data.map((n) => n[obj.primaryKey]));
            return;
        }
        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleClick(item) {
        props.history.push(
            `${obj.baseRoute}${item[obj.primaryKey]}/${slugify(
                item[obj.urlName],
                { replacement: "-", remove: null, lower: true }
            )}`
        );
    }

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setPage(0);
        setRowsPerPage(event.target.value);
    }

    if (loading) {
        return <FuseLoading />;
    }

    if (data.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There are no items!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table
                    stickyHeader
                    className="min-w-xl"
                    aria-labelledby="tableTitle"
                >
                    <TableHeader
                        selectedIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        onMenuItemClick={handleDeselect}
                        obj={obj}
                        removeItems={removeItems}
                    />

                    <TableBody>
                        {_.orderBy(
                            data,
                            [
                                (o) => {
                                    switch (order.field) {
                                        case "categories": {
                                            return o.categories[0];
                                        }
                                        default: {
                                            return o[order.field];
                                        }
                                    }
                                },
                            ],
                            [order.direction]
                        ).map((n) => {
                            const isSelected =
                                selected.indexOf(n[obj.primaryKey]) !== -1;
                            return (
                                <TableRow
                                    className="h-72 cursor-pointer"
                                    hover
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={n[obj.primaryKey]}
                                    selected={isSelected}
                                    onClick={(event) => handleClick(n)}
                                >
                                    <TableCell
                                        className="w-40 md:w-64 text-center"
                                        padding="none"
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            onClick={(event) =>
                                                event.stopPropagation()
                                            }
                                            onChange={(event) =>
                                                handleCheck(
                                                    event,
                                                    n[obj.primaryKey]
                                                )
                                            }
                                        />
                                    </TableCell>

                                    {obj.fields
                                        .filter((f) => f.list)
                                        .map((f) =>
                                            Object.keys(n).map((c, index) => {
                                                if (
                                                    ((f.type === "select" ||
                                                        f.type === "select2") &&
                                                    typeof f.option === "string"
                                                        ? f.field + f.view
                                                        : f.field) === c
                                                ) {
                                                    switch (f.type) {
                                                        case "date": {
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    className="p-4 md:p-16"
                                                                    component="th"
                                                                    scope="row"
                                                                    align={
                                                                        f.align
                                                                    }
                                                                >
                                                                    {Filters.svcDate(
                                                                        n[c],
                                                                        obj
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }
                                                        case "datetime": {
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    className="p-4 md:p-16"
                                                                    component="th"
                                                                    scope="row"
                                                                    align={
                                                                        f.align
                                                                    }
                                                                >
                                                                    {Filters.svcDateTime(
                                                                        n[c],
                                                                        obj
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }
                                                        case "select":
                                                        case "select2": {
                                                            const optionType =
                                                                typeof f.option;
                                                            let selectVal =
                                                                n[c];

                                                            switch (
                                                                optionType
                                                            ) {
                                                                case "object":
                                                                    selectVal =
                                                                        f.option.filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.Value ===
                                                                                n[
                                                                                    c
                                                                                ]
                                                                        )[0]
                                                                            ?.DisplayText;

                                                                    break;
                                                                case "function":
                                                                    selectVal =
                                                                        f
                                                                            .option(
                                                                                n[
                                                                                    f
                                                                                        .depend
                                                                                ]
                                                                            )
                                                                            ?.filter(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.Value ===
                                                                                    n[
                                                                                        c
                                                                                    ]
                                                                            )[0]?.DisplayText;

                                                                    break;
                                                                default:
                                                                    break;
                                                            }

                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    className="p-4 md:p-16"
                                                                    component="th"
                                                                    scope="row"
                                                                    padding="none"
                                                                >
                                                                    {selectVal}
                                                                </TableCell>
                                                            );
                                                        }
                                                        case "money": {
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    className="p-4 md:p-16"
                                                                    component="th"
                                                                    scope="row"
                                                                    align={
                                                                        f.align
                                                                    }
                                                                >
                                                                    {Filters.svcMoney(
                                                                        n[c],
                                                                        obj
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }
                                                        case "upload": {
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    className="w-52 px-4 md:px-0"
                                                                    component="th"
                                                                    scope="row"
                                                                    padding="none"
                                                                >
                                                                    {n[c]
                                                                        ?.length >
                                                                    0 ? (
                                                                        <div
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: Filters.svcImage(
                                                                                    n[
                                                                                        c
                                                                                    ] !=
                                                                                        null
                                                                                        ? obj
                                                                                              .gObj
                                                                                              .mainProject +
                                                                                              n[
                                                                                                  c
                                                                                              ]
                                                                                        : ""
                                                                                ),
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            className="w-full block rounded"
                                                                            src="assets/images/ecommerce/product-image-placeholder.png"
                                                                            alt={
                                                                                n[
                                                                                    f
                                                                                        .baseRoute
                                                                                ]
                                                                            }
                                                                        />
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }
                                                        case "active":
                                                        case "checkbox": {
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    className="p-4 md:p-16"
                                                                    component="th"
                                                                    scope="row"
                                                                    align={
                                                                        f.align
                                                                    }
                                                                >
                                                                    {Filters.svcActive(
                                                                        n[c]
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }
                                                        default:
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    className="p-4 md:p-16"
                                                                    component="th"
                                                                    scope="row"
                                                                    align={
                                                                        f.align
                                                                    }
                                                                >
                                                                    {n[c]}
                                                                </TableCell>
                                                            );
                                                    }
                                                } else {
                                                    return null;
                                                }
                                            })
                                        )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                className="flex-shrink-0 border-t-1"
                component="div"
                count={paging.TotalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(ListTable);
