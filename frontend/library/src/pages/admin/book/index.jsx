import { memo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import API from "../../../servers/api";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const fetchBooks = async () => {
        try {
            const response = await API.get("/admin/books/");
            setBooks(response.data.results);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await API.get("/admin/categories/");
            setCategories(response.data.results);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sách?")) {
            try {
                await API.delete(`/admin/books/${id}/`);
                setSuccess(true);
                fetchBooks();
            } catch (error) {
                console.error("Failed to fetch books:", error);
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
            field: "title",
            headerName: "Tên sách",
            flex: 1,
        },
        {
            field: "image",
            headerName: "Ảnh bìa",
            width: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return params.row.image ? (
                    <img
                        src={params.row.image}
                        alt="Book Cover"
                        style={{ width: 100, height: 150, objectFit: "cover", borderRadius: 4 }}
                    />
                ) : (
                    <span>Không có ảnh</span>
                );
            },
        },
        {
            field: "author",
            headerName: "Tác giả",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "category",
            headerName: "Thể loại",
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: (value, row, column, apiRef) => {
                const categoryId = Number(row.category.id);
                const category = categories.find(c => c.id === categoryId);
                return category ? category.name : "Không xác định";
            },
        },
        { field: "quantity", headerName: "Số lượng", width: 100, headerAlign: "center", align: "center" },
        {
            field: "rating",
            headerName: "Đánh giá",
            width: 100,
            headerAlign: "center",
            align: "center",
            valueGetter: (value, row, column, apiRef) => {
                return row.avg_rating ? row.avg_rating : "0";
            },
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
                        onClick={() => navigate(`/admin/books/edit/${params.row.id}`)}
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
                    📚 Quản lý sách
                </Typography>
                <Button component={Link} to="/admin/books/create" variant="contained" startIcon={<AddIcon />}>
                    Thêm sách
                </Button>
            </Box>

            <Box sx={{ height: 410, bgcolor: "white" }}>
                <DataGrid
                    rows={books}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowHeight={() => 150}
                    disableSelectionOnClick
                    sx={{ textAlign: "center" }}
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

export default memo(BookList);
