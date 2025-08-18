import { memo } from "react";
import { Paper, Typography, Button, Box } from "@mui/material";

const StepTwoConfirm = ({ handleBack }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Xác nhận mượn sách
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
                Bạn đã chọn mượn 1 sách. Vui lòng kiểm tra lại thông tin trước khi xác nhận.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button onClick={handleBack}>QUAY LẠI</Button>
                <Button variant="contained" sx={{ borderRadius: 10, px: 4 }}>
                    HOÀN TẤT ĐĂNG KÝ
                </Button>
            </Box>
        </Paper>
    );
};

export default memo(StepTwoConfirm);