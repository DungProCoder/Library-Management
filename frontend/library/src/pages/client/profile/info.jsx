import { memo, useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Grid,
    Link,
    CircularProgress,
} from "@mui/material";
import API from "../../../servers/api";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await API.get("/users/profile/");
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [])

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3} sx={{ flex: 1, backgroundColor: "#f7f8fa" }}>
            {/* Thông tin tài khoản */}
            <Typography variant="h6" gutterBottom>
                Thông tin tài khoản
            </Typography>
            <Grid container spacing={2}>
                {/* Thông tin liên hệ */}
                <Grid size={12} md={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardHeader title="THÔNG TIN LIÊN HỆ" />
                        <CardContent>
                            <Typography variant="body1" gutterBottom>
                                {user && user.first_name && user.last_name ? `${user.last_name} ${user.first_name}` : 'Annymous'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email: {user && user.email ? user.email : 'Chưa cập nhật'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Số điện thoại: {user && user.phone ? user.phone : 'Chưa cập nhật'}
                            </Typography>

                            <Box mt={2}>
                                <Link href="/thong-tin-ca-nhan/tai-khoan" underline="hover" sx={{ mr: 2 }}>
                                    Chỉnh sửa
                                </Link>
                                {user && user.role === "admin" && (
                                    <Link href="/admin" underline="hover">
                                        Đi đến trang quản trị
                                    </Link>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Sổ địa chỉ */}
            <Box mt={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Sổ địa chỉ</Typography>
                    <Link href="#" underline="hover">
                        Quản lý địa chỉ
                    </Link>
                </Grid>

                <Grid container spacing={2} mt={1}>
                    {/* Địa chỉ thanh toán mặc định */}
                    <Grid size={6}>
                        <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                            <CardHeader title="ĐỊA CHỈ THANH TOÁN MẶC ĐỊNH" />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Bạn chưa tạo địa chỉ thanh toán mặc định.
                                </Typography>
                                <Box mt={2}>
                                    <Link href="#" underline="hover">
                                        Sửa địa chỉ
                                    </Link>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Địa chỉ mặc định */}
                    <Grid size={6}>
                        <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                            <CardHeader title="ĐỊA CHỈ MẶC ĐỊNH" />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Bạn chưa tạo địa chỉ vận chuyển mặc định.
                                </Typography>
                                <Box mt={2}>
                                    <Link href="#" underline="hover">
                                        Sửa địa chỉ
                                    </Link>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default memo(ProfilePage);
