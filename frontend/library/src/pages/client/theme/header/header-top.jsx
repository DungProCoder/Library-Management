import { memo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    AppBar,
    Toolbar,
    InputBase,
    Box,
    Button,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import API from "../../../../servers/api";

const HeaderTop = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const token = localStorage.getItem("access_token");
    const isLoggedIn = !!token;

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const fetchUser = async () => {
        try {
            const res = await API.get("/users/profile/");
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/";
        handleMenuClose();
    };

    return (
        <>
            {/* Header */}
            <AppBar position="static" color="inherit" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                        <Link to="/">
                            <img
                                src="/assets/img/logo.png"
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
                        {/* Auth buttons / User menu */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {!isLoggedIn ? (
                                <>
                                    <Button component={Link} to="/dang-nhap" variant="text">
                                        Đăng nhập
                                    </Button>
                                    <Button component={Link} to="/dang-ky" variant="outlined">
                                        Tạo tài khoản
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Avatar
                                        sx={{ cursor: "pointer" }}
                                        src={user?.avatar || ""}
                                        onClick={handleMenuOpen}
                                    >
                                        {user?.first_name?.charAt(0) || ""}
                                    </Avatar>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                        slotProps={{
                                            paper: {
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&::before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        MenuListProps={{
                                            autoFocusItem: false,
                                        }}
                                    >
                                        <MenuItem onClick={() => { handleMenuClose(); navigate("/thong-tin-ca-nhan/thong-tin-lien-he"); }}>
                                            <Avatar /> Hồ sơ
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleMenuClose(); navigate("/thong-tin-ca-nhan/sach-da-muon"); }}>
                                            <BookmarkBorderOutlinedIcon
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    color: "#a5a5a5ff",
                                                    ml: -0.5,
                                                    mr: 1,
                                                }}
                                            /> Sách đã mượn
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleMenuClose(); navigate("/thong-tin-ca-nhan/sach-yeu-thich"); }}>
                                            <FavoriteBorderOutlinedIcon
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    color: "#a5a5a5ff",
                                                    ml: -0.5,
                                                    mr: 1,
                                                }}
                                            /> Sách yêu thích
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleMenuClose}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Cài đặt
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Đăng xuất
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        </>
    )
};

export default memo(HeaderTop);