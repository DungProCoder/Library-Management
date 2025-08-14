import { memo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Button,
    Paper,
    Menu,
    MenuItem
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const NavbarMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentMenu, setCurrentMenu] = useState(null);

    const handleOpenMenu = (event, menuName) => {
        setAnchorEl(event.currentTarget);
        setCurrentMenu(menuName);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setCurrentMenu(null);
    };

    return (
        <>
            {/* Menu ngang */}
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                <Paper elevation={0} sx={{ display: "flex", px: 2, py: 1, gap: 3, borderRadius: 4 }}>
                    {/* Trang chủ */}
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button>Trang chủ</Button>
                    </Link>

                    {/* Thể loại */}
                    <Button
                        endIcon={<KeyboardArrowDownIcon />}
                        variant="text"
                        disableRipple
                        onMouseEnter={(e) => handleOpenMenu(e, "theloai")}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: 'primary.main',
                            }
                        }}
                    >
                        Thể loại
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={currentMenu === "theloai"}
                        MenuListProps={{
                            onMouseEnter: () => { },
                            onMouseLeave: handleCloseMenu
                        }}
                    >
                        <MenuItem component={Link} to="/category/tieu-thuyet" onClick={handleCloseMenu}>
                            Tiểu thuyết
                        </MenuItem>
                        <MenuItem component={Link} to="/category/truyen-tranh" onClick={handleCloseMenu}>
                            Truyện tranh
                        </MenuItem>
                        <MenuItem component={Link} to="/category/kinh-te" onClick={handleCloseMenu}>
                            Kinh tế
                        </MenuItem>
                        <MenuItem component={Link} to="/category/khoa-hoc" onClick={handleCloseMenu}>
                            Khoa học
                        </MenuItem>
                    </Menu>

                    {/* Tuyển chọn */}
                    <Link to="/tuyen-chon" style={{ textDecoration: "none" }}>
                        <Button>Tuyển chọn</Button>
                    </Link>

                    {/* Hub sách */}
                    <Button
                        endIcon={<KeyboardArrowDownIcon />}
                        variant="text"
                        disableRipple
                        onMouseEnter={(e) => handleOpenMenu(e, "hubsach")}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: 'primary.main',
                            },
                        }}
                    >
                        Hub sách
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={currentMenu === "hubsach"}
                        MenuListProps={{
                            autoFocus: false,
                            onMouseEnter: () => { },
                            onMouseLeave: handleCloseMenu
                        }}
                    >
                        <MenuItem component={Link} to="/hub/sach-moi" onClick={handleCloseMenu}>
                            Sách mới
                        </MenuItem>
                        <MenuItem component={Link} to="/hub/sach-noi-bat" onClick={handleCloseMenu}>
                            Sách nổi bật
                        </MenuItem>
                        <MenuItem component={Link} to="/hub/sach-giam-gia" onClick={handleCloseMenu}>
                            Đang giảm giá
                        </MenuItem>
                    </Menu>

                    {/* Thư viện */}
                    <Button
                        endIcon={<KeyboardArrowDownIcon />}
                        variant="text"
                        disableRipple
                        onMouseEnter={(e) => handleOpenMenu(e, "thuvien")}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: 'primary.main',
                            }
                        }}
                    >
                        Thư viện
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={currentMenu === "thuvien"}
                        MenuListProps={{
                            onMouseEnter: () => { },
                            onMouseLeave: handleCloseMenu
                        }}
                    >
                        <MenuItem component={Link} to="/library/borrowed" onClick={handleCloseMenu}>
                            Sách đã mượn
                        </MenuItem>
                        <MenuItem component={Link} to="/library/favorites" onClick={handleCloseMenu}>
                            Sách yêu thích
                        </MenuItem>
                        <MenuItem component={Link} to="/library/history" onClick={handleCloseMenu}>
                            Lịch sử đọc
                        </MenuItem>
                    </Menu>

                    {/* Hỗ trợ */}
                    <Link to="/ho-tro" style={{ textDecoration: "none" }}>
                        <Button>Hỗ trợ</Button>
                    </Link>
                </Paper>
            </Container>
        </>
    )
};

export default memo(NavbarMenu);