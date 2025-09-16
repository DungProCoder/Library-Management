import { memo, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Typography,
    IconButton,
    Chip,
    Snackbar,
    Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Block, LockOpen } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../../../servers/api";

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await API.get("/users/list/");
            setUsers(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    const handleBlockedUser = async (id, isActive) => {
        const action = isActive ? "Block" : "Mở block";
        if (window.confirm(`${action} người dùng này?`)) {
            try {
                await API.put(`/users/block/${id}/`);
                setSuccessMessage(`${action} người dùng thành công`);
                setOpenSnackbar(true);
                fetchUsers();
            } catch (error) {
                console.error(`Failed to ${action.toLowerCase()} user:`, error);
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        document.title = "Library - Quản trị - Quản lý người dùng";
    }, []);

    const columns = [
        {
            field: "stt",
            headerName: "STT",
            width: 80,
            headerAlign: "center",
            align: "center",
            valueGetter: (value, row, column, apiRef) =>
                apiRef.current.getRowIndexRelativeToVisibleRows(row.id) + 1,
        },
        {
            field: "username",
            headerName: "Tên đăng nhập",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "role",
            headerName: "Vai trò",
            width: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Chip
                    label={params.value === "admin" ? "Admin" : "Người dùng"}
                    color={params.value === "admin" ? "primary" : "default"}
                    size="small"
                />
            ),
        },
        {
            field: "is_active",
            headerName: "Trạng thái",
            width: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) =>
                params.value ? (
                    <Chip label="Hoạt động" color="success" size="small" />
                ) : (
                    <Chip label="Đã khoá" color="error" size="small" />
                ),
        },
        {
            field: "actions",
            headerName: "Hành động",
            width: 140,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <>
                    <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <InfoIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => navigate(`/admin/users/edit/${params.row.id}`)}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    {params.row.role === "user" && (
                        params.row.is_active ? (
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleBlockedUser(params.row.id, params.row.is_active)}
                            >
                                <Block />
                            </IconButton>
                        ) : (
                            <IconButton
                                color="success"
                                size="small"
                                onClick={() => handleBlockedUser(params.row.id, params.row.is_active)}
                            >
                                <LockOpen />
                            </IconButton>
                        )
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
                    👤 Quản lý người dùng
                </Typography>
            </Box>

            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(UserList);
