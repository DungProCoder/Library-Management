import { memo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Add, Edit, Delete } from "@mui/icons-material";
import API from "../../../servers/api";
import dayjs from "dayjs";

const SeriesPage = () => {
    const [series, setSeries] = useState([]);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const fetchSeries = async () => {
        try {
            const response = await API.get("/admin/book-series/");
            setSeries(response.data.results);
        } catch (error) {
            console.error("Failed to fetch series book:", error);
        }
    };

    useEffect(() => {
        fetchSeries();
    }, []);

    useEffect(() => {
        document.title = "Library - Quản trị - Quản lý tuyển tập";
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa tuyển tập sách này?")) {
            try {
                await API.delete(`/admin/book-series/${id}/`);
                setSuccess(true);
                fetchSeries();
            } catch (error) {
                console.error("Failed to fetch book series:", error);
            }
        }
    }

    // Cấu hình cột cho DataGrid
    const columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            width: 70,
            valueGetter: (value, row, column, apiRef) =>
                apiRef.current.getRowIndexRelativeToVisibleRows(row.id) + 1,
        },
        { field: "title", headerName: "Tên Tuyển tập", flex: 2 },
        {
            field: "date_add",
            headerName: "Ngày tạo",
            headerAlign: "center",
            align: "center",
            flex: 1,
            width: 150,
            renderCell: (params) => {
                return params.value ? dayjs(params.value).format("DD/MM/YYYY HH:mm") : "";
            }
        },
        {
            field: "actions",
            headerName: "Hành động",
            headerAlign: "center",
            align: "center",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => navigate(`/admin/series/edit/${params.row.id}`)}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box p={3}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold">
                    🗂️ Quản lý tuyển tập
                </Typography>
                <Button
                    component={Link}
                    to="/admin/series/create"
                    variant="contained"
                    startIcon={<Add />}
                >
                    Thêm Tuyển tập
                </Button>
            </Box>

            {/* DataGrid */}
            <Box style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={series}
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

export default memo(SeriesPage);
