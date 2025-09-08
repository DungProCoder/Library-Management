import { memo, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CardMedia,
    IconButton,
    Button,
    Divider,
    Snackbar,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../../servers/api';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const navigate = useNavigate();

    const fetchBorrowRequests = async () => {
        try {
            setLoading(true);
            const res = await API.get("/client/borrow-requests/");
            setCartItems(res.data.results);
        } catch (err) {
            console.error("Lỗi khi lấy giỏ mượn:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBorrowRequests();
    }, []);

    const handleRemove = async (id) => {
        try {
            if (window.confirm("Xóa sách khỏi danh sách yêu cầu mượn?")) {
                await API.delete(`/client/borrow-requests/${id}/`);
                setCartItems((prev) => prev.filter((item) => item.id !== id));
                setSnackbar({
                    open: true,
                    message: "❌ Đã xoá sách khỏi giỏ mượn",
                    severity: "info"
                });
            }
        } catch (err) {
            console.error("Lỗi khi xoá:", err);
            setSnackbar({
                open: true,
                message: "Không thể xoá sách.",
                severity: "error"
            });
        }
    };

    return (
        <>
            <Paper sx={{ p: 2, mb: 3 }}>
                {cartItems.length === 0 ? (
                    <Typography sx={{ textAlign: "center" }}>Không có sách yêu cầu mượn.</Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Sách</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Thời hạn</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography>Đang tải...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                cartItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Box
                                                component={Link}
                                                to={`/${item.book.isbn}/`}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                    textDecoration: "none",
                                                    color: "inherit"
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={item.book.image}
                                                    alt={item.title}
                                                    sx={{ width: 80, height: 110, borderRadius: 1 }}
                                                />
                                                <Box>
                                                    <Typography variant="subtitle1">{item.book.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Tác giả: {item.book.author}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="primary"
                                                        sx={{ mt: 1, cursor: "pointer" }}
                                                    >
                                                        Chuyển tới danh sách yêu thích
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Typography
                                                variant="body2"
                                                color='text.secondary'
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {item.expected_days} ngày
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton onClick={() => handleRemove(item.id)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </Paper>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 10, px: 4 }}
                    disabled={cartItems.length === 0}
                    onClick={() => navigate("/tien-hanh-muon-sach")}
                >
                    TIẾN HÀNH MƯỢN
                </Button>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default memo(CartPage);