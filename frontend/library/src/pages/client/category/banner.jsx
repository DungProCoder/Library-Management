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
                        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop"
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
                                NHỮNG CUỐN SÁCH HAY TẠI ĐÂY!
                            </Typography>
                            <Typography variant="body1" color="#fff" sx={{ opacity: 0.9 }}>
                                Hãy cùng khám phá hàng trăm thể loại sách hấp dẫn
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default memo(Breadcrumb);