import { memo, useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Snackbar,
    Alert,
} from "@mui/material";
import API from "../../../servers/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.username.trim()) newErrors.username = "Tên đăng nhập không được bỏ trống";
        if (!form.email.includes("@")) newErrors.email = "Email không hợp lệ";
        if (form.password.length < 6) newErrors.password = "Mật khẩu ít nhất 6 ký tự";
        if (form.password !== form.password2) newErrors.password2 = "Mật khẩu không khớp";
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await API.post("/users/register/", form);
            setSuccess(true);
            setTimeout(() => navigate("/dang-nhap"), 1000);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors({ api: error.response.data.message || "Đăng ký thất bại" });
            } else {
                setErrors({ api: "Đăng ký thất bại" });
            }
        }
    };

    useEffect(() => {
        document.title = "Library - Đăng ký";
    }, []);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <Paper sx={{ p: 4, width: 400, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Đăng ký
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tên đăng nhập"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        label="Xác nhận mật khẩu"
                        name="password2"
                        type="password"
                        value={form.password2}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.password2}
                        helperText={errors.password2}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Đăng ký
                    </Button>
                </form>
            </Paper>

            <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    ✅ Đăng ký thành công! Chuyển hướng đến đăng nhập...
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(Register);
