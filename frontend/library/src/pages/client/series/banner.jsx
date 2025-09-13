import { memo } from 'react';
import {
    Container,
    Box,
    Typography,
} from "@mui/material";

const Breadcrumb = () => {
    return (
        <>
            {/* Banner */}
            <Container>
                <Box
                    sx={{
                        position: "relative",
                        borderRadius: 2,
                        overflow: "hidden",
                        mb: 3,
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1465433045946-ba6506ce5a59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="banner"
                        style={{ width: "100%", maxHeight: 260, objectFit: "cover" }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(0,0,0,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            px: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h5" fontWeight={800} color="#fff" letterSpacing={1}>
                                TUYỂN TẬP NHỮNG CUỐN SÁCH HAY VÀ THÚ VỊ TẠI ĐÂY!
                            </Typography>
                            <Typography variant="body1" color="#fff" sx={{ opacity: 0.9 }}>
                                Thưởng thức những cuốn sách đặc sắc từ nhiều thể loại khác nhau.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default memo(Breadcrumb);