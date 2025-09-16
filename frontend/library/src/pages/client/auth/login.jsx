import { memo, useState, useEffect } from "react";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // gọi API login
            const res = await API.post("/users/token/", form);

            const { access, refresh } = res.data;

            // Lưu token
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            // Gọi API /me để lấy thông tin user
            const userRes = await API.get("/users/me/", {
                headers: { Authorization: `Bearer ${access}` },
            });

            localStorage.setItem("user", JSON.stringify(userRes.data));

            setSuccess(true);
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            console.error(err);
            setError("Sai tên đăng nhập hoặc mật khẩu!");
        }
    };

    useEffect(() => {
        document.title = "Library - Đăng nhập";
    }, []);

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
