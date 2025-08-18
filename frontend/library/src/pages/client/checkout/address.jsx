import { memo } from "react";
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

const Address = ({ location, setLocation, handleNext }) => {
    return (
        <>
            <Grid container spacing={3}>
                {/* Form địa chỉ */}
                <Grid size={8} item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Địa chỉ bạn đọc
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={6} item xs={6}>
                                <TextField fullWidth label="Họ" required />
                            </Grid>
                            <Grid size={6} item xs={6}>
                                <TextField fullWidth label="Tên" required />
                            </Grid>
                            <Grid size={12} item xs={12}>
                                <TextField fullWidth label="Địa chỉ đường" required />
                            </Grid>
                            <Grid size={6} item xs={6}>
                                <TextField fullWidth label="Tỉnh/Thành phố" required />
                            </Grid>
                            <Grid size={6} item xs={6}>
                                <TextField fullWidth label="Khu vực/Quận" required />
                            </Grid>
                            <Grid size={12} item xs={12}>
                                <TextField fullWidth label="Số điện thoại" required />
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
                                value="dn"
                                control={<Radio />}
                                label="The Books Library & Coffee – Số 12 Cao Thắng, Hải Châu, Đà Nẵng"
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
                <Grid size={4} item xs={12} md={4}>
                    <Accordion defaultExpanded>
                        {/* Header */}
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="h6">Tóm tắt yêu cầu mượn</Typography>
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    1 SÁCH ĐANG ĐĂNG KÝ
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        {/* Nội dung */}
                        <AccordionDetails>
                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_139949.jpg"
                                    alt="Elon Musk"
                                    style={{ width: 60, height: 90, objectFit: "cover", borderRadius: 8 }}
                                />
                                <Box sx={{ ml: 2, flexGrow: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        1 Quyển
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                {/* Buttons */}
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ borderRadius: 10, px: 4 }}
                    >
                        TIẾP THEO
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default memo(Address);