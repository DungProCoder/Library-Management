import { memo } from "react";
import {
    Grid,
    Box,
    Typography,
    Button
} from "@mui/material";
import { Link } from "react-router-dom";

const Information = () => {
    return (
        <>
            <Grid sx={{ justifyContent: "space-between" }} container spacing={5}>
                {/* Cột 1 - Giới thiệu */}
                <Grid>
                    <img
                        src="/assets/img/logo.png"
                        alt="Logo"
                        style={{ height: 60, width: 80 }}
                    />
                    <Typography variant="body2">
                        Website quản lý và mượn sách trực tuyến. <br />
                        Cung cấp các đầu sách đa dạng và dịch vụ nhanh chóng.
                    </Typography>
                </Grid>

                <Grid>
                    <Typography variant="h6" gutterBottom>
                        Thông tin chung
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        {[
                            { label: 'Thể loại', to: '/the-loai' },
                            { label: 'Tuyển chọn', to: '/tuyen-chon' },
                            { label: 'Hub sách', to: '/hub-sach' },
                            { label: 'Thư viện', to: '/thu-vien' },
                            { label: 'Hỗ trợ', to: '/ho-tro' },
                        ].map((item, index) => (
                            <Button
                                key={index}
                                component={Link}
                                to={item.to}
                                variant="text"
                                disableRipple
                                sx={{
                                    padding: 0,
                                    justifyContent: 'flex-start',
                                    textTransform: 'none',
                                    color: 'text.primary',
                                    transition: 'color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Grid>

                {/* Cột 2 - Liên hệ */}
                <Grid>
                    <Typography variant="h6" gutterBottom>
                        Liên hệ
                    </Typography>
                    <Typography variant="body2">📍 123 Đường ABC, Hà Nội</Typography>
                    <Typography variant="body2">📞 0123 456 789</Typography>
                    <Typography variant="body2">✉️ contact@library.com</Typography>
                </Grid>

                {/* Cột 3 - Mạng xã hội */}
                <Grid>
                    <Typography variant="h6" gutterBottom>
                        Kết nối
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <img src="/assets/img/icon-facebook.png" alt="Facebook" style={{ width: 24 }} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <img src="/assets/img/icon-instagram.png" alt="Instagram" style={{ width: 24 }} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <img src="/assets/img/icon-twitter.png" alt="Twitter" style={{ width: 24 }} />
                        </a>
                        <a href="https://telegram.com" target="_blank" rel="noreferrer">
                            <img src="/assets/img/icon-telegram.png" alt="Twitter" style={{ width: 24 }} />
                        </a>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default memo(Information);