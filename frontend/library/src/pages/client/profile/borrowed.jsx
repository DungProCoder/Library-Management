import { memo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import API from "../../../servers/api";
import dayjs from "dayjs";


const BorrowedList = () => {
    const [loading, setLoading] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [records, setRecords] = useState([]);

    const fetchBorrowed = async () => {
        try {
            setLoading(true);
            const res = await API.get("/client/borrow-records/");
            setRecords(res.data.results);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách đã mượn:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBorrowed();
    }, []);

    const handleOpenDialog = (record) => {
        setSelectedRecord(record);
    };

    const handleCloseDialog = () => {
        setSelectedRecord(null);
    };

    const handleReturn = async () => {
        if (!selectedRecord) return;

        try {
            await API.put(`/client/borrow-records/${selectedRecord.id}/return/`);
            // reload lại danh sách
            setRecords((prev) =>
                prev.map((r) =>
                    r.id === selectedRecord.id
                        ? { ...r, status: "pending_return" }
                        : r
                )
            );
            handleCloseDialog();
        } catch (err) {
            console.error("Lỗi khi trả sách:", err);
        }
    };

    const getStatusProps = (record) => {
        // Nếu đang mượn mà đã quá hạn
        if (record.status === "borrowing" && dayjs(record.due_date).isBefore(dayjs(), "day")) {
            return { label: "Quá hạn", color: "error" };
        }

        switch (record.status) {
            case "borrowing":
                return { label: "Đang mượn", color: "primary" };
            case "pending_return":
                return { label: "Chờ xác nhận trả", color: "warning" };
            case "returned":
                return { label: "Đã trả", color: "success" };
            case "overdue":
                return { label: "Quá hạn", color: "error" };
            default:
                return { label: record.status, color: "default" };
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3} sx={{ flex: 1, backgroundColor: "#f7f8fa" }}>
            <Typography variant="h5" gutterBottom>
                Danh sách sách đã mượn
            </Typography>

            {records.length === 0 ? (
                <Typography variant="body1">Bạn chưa mượn quyển nào.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {records.map((record) => (
                        <Grid size={12} key={record.id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Typography variant="h6" fontWeight="bold">
                                                Mã mượn #{record.id}
                                            </Typography>
                                            <Chip
                                                {...getStatusProps(record)}
                                                sx={{ fontWeight: "bold" }}
                                            />
                                        </Box>
                                        {record.status === "borrowing" ? (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{ borderRadius: 2 }}
                                                onClick={() => handleOpenDialog(record)}
                                            >
                                                Trả sách
                                            </Button>
                                        ) : record.status === "returned" ? (
                                            <Typography variant="body2" color="success.main" fontWeight="bold">
                                                Đã trả ngày {new Date(record.return_date).toLocaleDateString("vi-VN")}
                                            </Typography>
                                        ) : null}
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Ngày mượn: {new Date(record.borrow_date).toLocaleDateString("vi-VN")}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Hạn trả: {new Date(record.due_date).toLocaleDateString("vi-VN")}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <Grid container spacing={2}>
                                        {record.items.map((item) => (
                                            <Grid size={4} key={item.id}>
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <img
                                                        src={item.book_image}
                                                        alt={item.book_title}
                                                        style={{ width: 60, height: 90, borderRadius: 8 }}
                                                    />
                                                    <Box>
                                                        <Typography fontWeight={500}>{item.book_title}</Typography>
                                                        <Typography variant="caption" color="text.secondary">Số lượng: {item.quantity}</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )
            }
            <Dialog open={Boolean(selectedRecord)} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận trả sách</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn trả sách <b>Mã mượn #{selectedRecord?.id}</b> không?
                        Sau khi xác nhận, trạng thái sẽ chuyển thành <b>Chờ xác nhận trả</b>.
                        Sau khi nhận được sách chúng tôi sẽ cập nhật lại trạng thái và bạn có thể tiếp tục mượn sách.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} disabled={loading}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleReturn}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};


export default memo(BorrowedList);