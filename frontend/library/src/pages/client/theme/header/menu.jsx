import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Button,
    Paper,
    Menu,
    MenuItem
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import API from "../../../../servers/api";
import { useCategory } from "../../context/CategoryContext";

const NavbarMenu = () => {
    const [categories, setCategories] = useState([]);
    const { setSelectedCategory } = useCategory();
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

    const fetchCategories = async () => {
        try {
            const response = await API.get("/client/categories/");
            setCategories(response.data.results);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

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
                        autoFocus={false}
                        PaperProps={{
                            style: {
                                maxHeight: 230,
                                overflow: "auto"
                            }
                        }}
                        MenuListProps={{
                            autoFocusItem: false,
                            onMouseEnter: () => { },
                            onMouseLeave: handleCloseMenu
                        }}
                    >
                        <MenuItem
                            component={Link}
                            to="/the-loai/"
                            onClick={() => {
                                setSelectedCategory(null);
                                handleCloseMenu();
                            }}
                        >
                            Tất cả thể loại
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem
                                key={category.id}
                                component={Link}
                                to={`/the-loai/?=${category.slug}`}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    handleCloseMenu();
                                }}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* Sách tuyển tập */}
                    <Link to="/tuyen-tap" style={{ textDecoration: "none" }}>
                        <Button>Tuyển tập sách</Button>
                    </Link>

                    {/* Sách đăng ký mượn */}
                    <Link to="/dang-ky-muon-sach" style={{ textDecoration: "none" }}>
                        <Button>Sách đăng ký mượn</Button>
                    </Link>

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