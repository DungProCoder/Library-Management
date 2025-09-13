import { memo, useEffect, useState } from "react";
import API from "../../../servers/api";
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await API.get("/admin/categories/");
            setCategories(response.data.results);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa thể loại này?")) {
            try {
                await API.delete(`/admin/categories/${id}/`);
                setSuccess(true);
                fetchCategories();
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }
    }

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
            field: "name",
            headerName: "Tên thể loại",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "slug",
            headerName: "Slug",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "actions",
            headerName: "Hành động",
            width: 140,
            sortable: false,
            disableColumnMenu: true,
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
                        onClick={() => navigate(`/admin/categories/edit/${params.row.id}`)}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
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
                    📂 Quản lý Thể loại
                </Typography>
                <Button component={Link} to="/admin/categories/create" variant="contained" startIcon={<AddIcon />}>
                    Thêm
                </Button>
            </Box>

            <Box sx={{ height: 422, width: "100%" }}>
                <DataGrid
                    rows={categories}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Box>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    ✅ Đã xóa thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(CategoryList);
