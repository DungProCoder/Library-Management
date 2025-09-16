import { memo, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
    Box,
    Typography,
    Snackbar,
    Alert,
    Collapse,
    Divider
} from "@mui/material";
import { IconButton } from "@mui/material";
import {
    KeyboardArrowUp,
    KeyboardArrowDown,
    CheckCircle,
    AssignmentReturn
} from "@mui/icons-material";
import API from "../../../servers/api";

const BorrowRecordList = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openRow, setOpenRow] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleToggleRow = (id) => {
        setOpenRow(openRow === id ? null : id);
    };

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await API.get("/admin/borrow/");
                setRecords(res.data.results);
            } catch (err) {
                console.error("Lỗi khi load danh sách mượn:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    useEffect(() => {
        document.title = "Library - Quản trị - Quản lý mượn / trả sách";
    }, []);

    const handleConfirmReturn = async (id) => {
        if (window.confirm("Xác nhận đã trả toàn bộ sách?")) {
            try {
                await API.put(`/admin/return/${id}/`);
                setRecords((prev) =>
                    prev.map((r) =>
                        r.id === id
                            ? { ...r, status: "returned", return_date: new Date().toISOString() }
                            : r
                    )
                );
                setSuccess(true);
            } catch (err) {
                console.error("Lỗi khi trả sách:", err);
            }
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    const columns = [
        {
            field: "expand",
            headerName: "",
            width: 50,
            sortable: false,
            renderCell: (params) => (
                <IconButton
                    size="small"
                    onClick={() => handleToggleRow(params.row.id)}
                >
                    {openRow === params.row.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            ),
        },
        {
            field: "stt",
            headerName: "STT",
            width: 70,
            headerAlign: "center",
            align: "center",
            valueGetter: (value, row, column, apiRef) =>
                apiRef.current.getRowIndexRelativeToVisibleRows(row.id) + 1,
        },
        {
            field: "full_name",
            headerName: "Người mượn",
            flex: 1,
            renderCell: (params) => (
                <span>{params.row.last_name} {params.row.first_name}</span>
            ),
        },
        {
            field: "borrow_date",
            headerName: "Ngày mượn",
            width: 150,
            align: "center",
            headerAlign: "center",
            renderCell: (params) =>
                new Date(params.row.borrow_date).toLocaleDateString("vi-VN"),
        },
        {
            field: "due_date",
            headerName: "Hạn trả",
            width: 150,
            align: "center",
            headerAlign: "center",
            renderCell: (params) =>
                new Date(params.row.due_date).toLocaleDateString("vi-VN"),
        },
        {
            field: "return_date",
            headerName: "Đã trả",
            width: 150,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                const date = params.row.return_date;
                return date
                    ? new Date(date).toLocaleDateString("vi-VN")
                    : "Chưa cập nhật";
            },
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 220,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                let color = "default";
                let label = "";

                switch (params.value) {
                    case "borrowing":
                        color = "blue";
                        label = "Đang mượn";
                        break;
                    case "pending_return":
                        color = "orange";
                        label = "Chờ xác nhận";
                        break;
                    case "returned":
                        color = "green";
                        label = "Đã trả";
                        break;
                    default:
                        color = "gray";
                        label = params.value;
                }

                return (
                    <span style={{ color, fontWeight: "bold" }}>
                        {label}
                    </span>
                );
            },
        },
        {
            field: "actions",
            headerName: "Hành động",
            width: 150,
            align: "center",
            headerAlign: "center",
            sortable: false,
            renderCell: (params) => (
                <>
                    {params.row.status === "returned" ? (
                        <IconButton color="success" size="small" sx={{ pointerEvents: "none" }}>
                            <CheckCircle />
                        </IconButton>
                    ) : params.row.status === "pending_return" || params.row.status === "overdue" ? (
                        <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleConfirmReturn(params.row.id)}
                        >
                            <AssignmentReturn />
                        </IconButton>
                    ) : (
                        <IconButton color="light" size="small" disabled>
                            <CheckCircle />
                        </IconButton>
                    )}
                </>
            ),
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h5" fontWeight="bold">
                    📖 Quản lý mượn / trả sách
                </Typography>
            </Box>

            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={records}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{ Toolbar: GridToolbar }}
                    disableSelectionOnClick
                />

                {/* Expand content */}
                {records.map((record) => (
                    <Collapse
                        key={record.id}
                        in={openRow === record.id}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Box sx={{ p: 2, background: "#f9f9f9" }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Chi tiết sách mượn:
                            </Typography>
                            <Divider sx={{ mb: 1 }} />
                            {record.items.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{ display: "flex", gap: 2, mb: 1, alignItems: "center" }}
                                >
                                    <img
                                        src={item.book_image}
                                        alt={item.book_title}
                                        style={{ width: 50, height: 70, borderRadius: 4 }}
                                    />
                                    <Box>
                                        <Typography>{item.book_title}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            SL: {item.quantity}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Collapse>
                ))}
            </Box>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    ✅ Cập nhật thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(BorrowRecordList);
