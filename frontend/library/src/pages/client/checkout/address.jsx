import { memo, useState, useEffect } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Radio,
    Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import API from "../../../servers/api";

const Address = ({ location, setLocation, handleNext, formData, setFormData }) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    const isFormValid = () => {
        return (
            formData.first_name.trim() !== "" &&
            formData.last_name.trim() !== "" &&
            formData.address.trim() !== "" &&
            formData.phone.trim() !== "" &&
            location.trim() !== ""
        );
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const fetchBorrowRequests = async () => {
        try {
            setLoading(true);
            const res = await API.get("/client/borrow-requests/");
            setItems(res.data.results);
        } catch (err) {
            console.error("Lỗi khi lấy giỏ mượn:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBorrowRequests();
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                {/* Form địa chỉ */}
                <Grid size={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Thông tin người mượn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Họ"
                                    value={formData.last_name}
                                    onChange={(e) => handleChange("last_name", e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Tên"
                                    value={formData.first_name}
                                    onChange={(e) => handleChange("first_name", e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    value={formData.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="h6" sx={{ mt: 3 }}>
                            Địa điểm nhận sách
                        </Typography>
                        <RadioGroup
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <FormControlLabel
                                value="hcm"
                                control={<Radio />}
                                label="Xe Buýt Sách – Đường sách TP. HCM, Nguyễn Văn Bình, Quận 1"
                            />
                            <FormControlLabel
                                value="hn"
                                control={<Radio />}
                                label="Thư viện Blacasa – Số 6 ngõ 92 Láng Hạ, Đống Đa, Hà Nội"
                            />
                        </RadioGroup>
                    </Paper>
                </Grid>

                {/* Sidebar */}
                <Grid size={4}>
                    <Accordion defaultExpanded>
                        {/* Header */}
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="h6">Tóm tắt yêu cầu mượn</Typography>
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    {items.length} SÁCH ĐANG ĐĂNG KÝ
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        {/* Nội dung */}
                        <AccordionDetails>
                            <Divider sx={{ mb: 2 }} />

                            {loading ? (
                                <Typography>Đang tải...</Typography>
                            ) : items.length === 0 ? (
                                <Typography>Không có sách đăng ký nào.</Typography>
                            ) : (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    {items.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{ display: "flex", alignItems: "center" }}
                                        >
                                            <img
                                                src={item.book?.image || "https://via.placeholder.com/60x90"}
                                                alt={item.book?.title}
                                                style={{
                                                    width: 60,
                                                    height: 90,
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                }}
                                            />
                                            <Box sx={{ display: "flex", flexDirection: "column", ml: 2, flexGrow: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {item.book?.title}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Số lượng: {item.quantity || 1} quyển
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Thời hạn: {item.expected_days} ngày
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                {/* Buttons */}
                <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ borderRadius: 10, px: 4 }}
                        disabled={!isFormValid()}
                    >
                        TIẾP THEO
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default memo(Address);