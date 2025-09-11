import { memo, useState, useEffect } from "react";
import {
    Box,
    Grid,
    TextField,
    Avatar,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
    Paper,
    Snackbar,
    Alert
} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import API from "../../../servers/api";

const AccountPage = () => {
    const [form, setForm] = useState({
        id: null,
        username: "",
        avatar: null,
        preview: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        isActive: true,
        changeEmail: false,
        changePassword: false,
    });
    const [success, setSuccess] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setForm((prev) => ({ ...prev, avatar: file }));
            setForm((prev) => ({ ...prev, preview: URL.createObjectURL(file) }));
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const fetchUser = async () => {
        try {
            const res = await API.get("/users/profile/");
            const data = res.data;
            setForm((prev) => ({
                ...prev,
                id: data.id,
                username: data.username || "",
                avatar: data.avatar || null,
                preview: data.avatar || null,
                firstName: data.first_name || "",
                lastName: data.last_name || "",
                email: data.email || "",
                phone: data.phone || "",
            }));
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            if (form.avatar instanceof File) {
                formData.append("avatar", form.avatar);
            }

            formData.append("username", form.username);
            formData.append("first_name", form.firstName);
            formData.append("last_name", form.lastName);
            formData.append("phone", form.phone);
            formData.append("is_active", form.isActive);

            if (form.changeEmail) {
                formData.append("email", form.email);
            }

            if (form.changePassword) {
                formData.append("current_password", form.currentPassword);
                formData.append("new_password", form.newPassword);
                formData.append("confirm_password", form.confirmPassword);
            }

            await API.put(`/users/update/${form.id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            setSuccess(true);
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };
    
    return (
        <Box sx={{ flex: 1 }}>
            {/* Form update */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Cập nhật tài khoản
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                                {form.avatar ? (
                                    <Avatar
                                        src={form.preview}
                                        alt="Avatar"
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            border: "3px solid #ddd",
                                            boxShadow: 2,
                                        }}
                                    />
                                ) : (
                                    <Avatar
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            bgcolor: "#f7f8fa",
                                            border: "3px dashed #ccc",
                                        }}
                                    >
                                        <ImageIcon sx={{ fontSize: 50, color: "#999" }} />
                                    </Avatar>
                                )}

                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{ mt: 2, borderRadius: 3 }}
                                >
                                    Upload Ảnh
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>

                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                    Chọn ảnh định dạng JPG, PNG (≤ 2MB)
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={6}>
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
                                label="Tên"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Họ"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Số điện thoại"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />

                            {/* Nếu tích "Thay đổi Email" thì hiện Email */}
                            {form.changeEmail && (
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            )}

                            {/* Nếu tích "Đổi mật khẩu" thì hiện các field mật khẩu */}
                            {form.changePassword && (
                                <>
                                    <TextField
                                        label="Mật khẩu hiện tại"
                                        type="password"
                                        name="currentPassword"
                                        value={form.currentPassword}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Mật khẩu mới"
                                        type="password"
                                        name="newPassword"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Xác nhận mật khẩu mới"
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                </>
                            )}

                            {/* Checkbox */}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="changeEmail"
                                        checked={form.changeEmail}
                                        onChange={handleChange}
                                    />
                                }
                                label="Thay đổi Email"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="changePassword"
                                        checked={form.changePassword}
                                        onChange={handleChange}
                                    />
                                }
                                label="Đổi mật khẩu"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Lưu
                        </Button>
                    </Box>
                </form>

                <Snackbar
                    open={success}
                    autoHideDuration={3000}
                    onClose={() => setSuccess(false)}
                >
                    <Alert severity="success" onClose={() => setSuccess(false)}>
                        ✅ Lưu thành công!
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default memo(AccountPage);
