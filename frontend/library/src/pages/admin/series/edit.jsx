import { memo, useState, useEffect } from "react";
import API from "../../../servers/api";
import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const SeriesEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await API.get(`/admin/book-series/${id}/`);
                setTitle(response.data.title);
            } catch (error) {
                console.error("Failed to fetch category:", error);
            }
        };

        fetchCategory();
    }, [id]);

    useEffect(() => {
        document.title = "Library - Quản trị - Chỉnh sửa tuyển tập";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/admin/book-series/${id}/`, { title });
            setSuccess(true);
            setTimeout(() => navigate("/admin/series"), 1000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                margin: "0 auto",
                padding: 3,
            }}
        >
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    ✏️ Sửa tuyển tập
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                maxWidth: 150,
                                width: "100%",
                            }}
                        >
                            Lưu thay dổi
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Box sx={{ p: 1, mt: 2 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/admin/series")}
                >
                    <KeyboardReturnIcon /> Quay lại
                </Button>
            </Box>

            {/* Thông báo thành công */}
            <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    ✅ Cập nhật thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(SeriesEdit);