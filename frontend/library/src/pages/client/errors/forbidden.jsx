// src/pages/Forbidden.jsx
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

export default function Forbidden() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                p: 3,
            }}
        >
            <ReportGmailerrorredIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
            <Typography variant="h3" gutterBottom>
                403 – Forbidden
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                Bạn không có quyền truy cập vào trang này.
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
            >
                Quay về Trang chủ
            </Button>
        </Box>
    );
}
