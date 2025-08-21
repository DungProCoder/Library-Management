import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Block, LockOpen } from "@mui/icons-material";

const UserList = () => {
    const users = [
        { id: 1, username: "admin", email: "admin@example.com", role: "admin", is_active: true },
        { id: 2, username: "john", email: "john@example.com", role: "user", is_active: true },
        { id: 3, username: "mary", email: "mary@example.com", role: "user", is_active: false },
    ];

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
            headerAlign: "center",
            align: "center",
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
                    <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    {params.row.is_active ? (
                        <IconButton color="error" size="small">
                            <Block />
                        </IconButton>
                    ) : (
                        <IconButton color="success" size="small">
                            <LockOpen />
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
                    👤 Quản lý người dùng
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Thêm
                </Button>
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
        </Box>
    );
};

export default UserList;
