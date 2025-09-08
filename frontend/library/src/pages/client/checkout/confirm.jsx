import { memo } from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import API from "../../../servers/api";

const StepTwoConfirm = ({ handleBack, formData, location }) => {
    const handleConfirm = async () => {
        try {
            await API.post("/client/borrow-records/", {
                ...formData,
                location,
            });
            alert("✅ Mượn sách thành công!");
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("❌ Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Xác nhận mượn sách
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
                Vui lòng kiểm tra lại thông tin trước khi xác nhận.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button onClick={handleBack}>QUAY LẠI</Button>
                <Button variant="contained" sx={{ borderRadius: 10, px: 4 }} onClick={handleConfirm}>
                    HOÀN TẤT ĐĂNG KÝ
                </Button>
            </Box>
        </Paper>
    );
};

export default memo(StepTwoConfirm);