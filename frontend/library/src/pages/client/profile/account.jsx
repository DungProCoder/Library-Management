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
} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import API from "../../../servers/api";

const AccountPage = () => {
    const [form, setForm] = useState({
        avatar: null,
        preview: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        changeEmail: false,
        changePassword: false,
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data gửi API:", form);
        // TODO: gọi API Django (PATCH/PUT) để update user
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
            </Paper>
        </Box>
    );
};

export default memo(AccountPage);
