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
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const SeriesAdd = () => {
    const [title, setTitle] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            API.post("/admin/book-series/", { title });

            setSuccess(true);
            setTitle("");

            setTimeout(() => {
                navigate("/admin/series");
            }, 1000);
        } catch (err) {
            console.error(err);
            setError(true);
        }

        setSuccess(true);
        setTitle("");
    };

    useEffect(() => {
        document.title = "Library - Quản trị - Thêm mới tuyển tập";
    }, []);

    return (
        <Box
            sx={{
                margin: "0 auto",
                padding: 3,
            }}
        >
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    ➕ Thêm tuyển tập mới
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
                                maxWidth: 160,
                                width: "100%",
                            }}
                        >
                            Thêm tuyển tập
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
                    ✅ Thêm thành công!
                </Alert>
            </Snackbar>

            {/* Thông báo lỗi */}
            <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
                <Alert severity="error" onClose={() => setError(false)}>
                    ❌ Có lỗi xảy ra khi thêm!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(SeriesAdd);