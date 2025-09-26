import { memo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Snackbar,
    Alert,
    Chip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import API from "../../../servers/api";

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const fetchFAQs = async () => {
        try {
            const response = await API.get("/admin/faqs/");
            setFaqs(response.data.results);
        } catch (error) {
            console.error("Failed to fetch FAQs:", error);
        }
    };

    useEffect(() => {
        fetchFAQs();
    }, []);

    useEffect(() => {
        document.title = "Library - Quản trị - Quản lý FAQs";
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa câu hỏi này?")) {
            try {
                await API.delete(`/admin/faqs/${id}/`);
                setSuccess(true);
                fetchFAQs();
            } catch (error) {
                console.error("Failed to fetch FAQs:", error);
            }
        }
    };

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
            field: "question",
            headerName: "Câu hỏi",
            flex: 1,
        },
        {
            field: "answer",
            headerName: "Trả lời",
            flex: 1,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    {params.value ? (
                        <Typography variant="body2">{params.value}</Typography>
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontStyle="italic"
                        >
                            Chưa có câu trả lời
                        </Typography>
                    )}
                </Box>
            )
        },
        {
            field: "keywords",
            headerName: "Từ khóa",
            width: 230,
            renderCell: (params) => (
                <Box sx={{ display: "flex", alignItems: "center", height: "100%", flexWrap: "wrap", gap: 0.5 }}>
                    {params.value && params.value.length > 0 ? (
                        params.value.map((kw, idx) => (
                            <Chip
                                key={idx}
                                label={kw}
                                size="small"
                                variant="outlined"
                            />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                            Không có từ khóa
                        </Typography>
                    )}
                </Box>
            ),
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
                        onClick={() => navigate(`/admin/faqs/edit/${params.row.id}`)}
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
                    📚 Quản lý FAQs
                </Typography>
                <Button component={Link} to="/admin/faqs/create" variant="contained" startIcon={<AddIcon />}>
                    Thêm FAQ
                </Button>
            </Box>

            <Box sx={{ height: 422, bgcolor: "white" }}>
                <DataGrid
                    rows={faqs}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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

export default memo(FAQPage);