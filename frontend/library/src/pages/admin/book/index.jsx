import { memo, useState } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

const BookList = () => {
    const [books] = useState([
        {
            id: 1,
            title: "Clean Code - A Handbook of Agile Software Craftsmanship",
            author: "Robert C. Martin",
            category: "Programming",
            quantity: 5,
            rating: 4.5,
        },
        {
            id: 2,
            title: "The Pragmatic Programmer - From Journeyman to Master",
            author: "Andrew Hunt",
            category: "Programming",
            quantity: 3,
            rating: 4.7,
        },
        {
            id: 3,
            title: "Atomic Habits - An Easy & Proven Way to Build Good Habits & Break Bad Ones",
            author: "James Clear",
            category: "Self-help",
            quantity: 10,
            rating: 4.8,
        },
    ]);

    const columns = [
        { field: "id", headerName: "ID", width: 70, headerAlign: "center", align: "center" },
        { field: "title", headerName: "Tên sách", flex: 1 },
        { field: "author", headerName: "Tác giả", flex: 1 },
        { field: "category", headerName: "Thể loại", width: 150 },
        { field: "quantity", headerName: "Số lượng", width: 120, headerAlign: "center", align: "center" },
        { field: "rating", headerName: "Đánh giá", width: 120, headerAlign: "center", align: "center" },
        {
            field: "actions",
            headerName: "Hành động",
            width: 140,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: () => (
                <>
                    <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <InfoIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small">
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

            <Box sx={{ height: 400, bgcolor: "white" }}>
                <DataGrid
                    rows={books}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    sx={{ textAlign: "center" }}
                />
            </Box>
        </Box>
    );
};

export default memo(BookList);
