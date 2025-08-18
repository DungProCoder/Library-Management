import { memo } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    AppBar,
    Toolbar,
    InputBase,
    Box,
    Button
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const HeaderTop = () => {
    return (
        <>
            {/* Header */}
            <AppBar position="static" color="inherit" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                        <Link to="/">
                            <img
                                src="assets/img/logo.png"
                                alt="Logo"
                                style={{ height: 80, width: 100 }}
                            />
                        </Link>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#f0f0f0",
                                borderRadius: 2,
                                px: 1,
                                width: 400,
                            }}
                        >
                            <SearchIcon />
                            <InputBase placeholder="Tìm tên sách, có dấu..." sx={{ ml: 1, flex: 1 }} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Button variant="text">Đăng nhập</Button>
                            <Button variant="outlined">Tạo tài khoản</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
};

export default memo(HeaderTop);