import { memo, useState } from "react";
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
import API from "../../../servers/api";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        API.post("/users/token/", form)
            .then((res) => {
                // Lưu token vào localStorage
                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("refresh_token", res.data.refresh);

                setSuccess(true);
                setTimeout(() => navigate("/"), 1000);
            })
            .catch(() => {
                setError("Sai tên đăng nhập hoặc mật khẩu!");
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f4f6f8",
            }}
        >
            <Paper sx={{ p: 4, width: 400, boxShadow: 3 }}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Đăng nhập
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tên đăng nhập"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Đăng nhập
                    </Button>
                </form>

                {/* Hiển thị lỗi */}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </Paper>

            {/* Thông báo thành công */}
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success">✅ Đăng nhập thành công!</Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(Login);
