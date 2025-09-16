import { memo, useEffect } from "react";
import {
    Box,
    Paper,
    Container,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const ProfilePage = () => {
    useEffect(() => {
        document.title = "Library - Hồ sơ cá nhân";
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box display="flex" gap={3}>
                {/* Sidebar */}
                <Paper sx={{ width: 250, flexShrink: 0 }}>
                    <Sidebar />
                </Paper>

                <Outlet />
            </Box>
        </Container>
    );
};

export default memo(ProfilePage);