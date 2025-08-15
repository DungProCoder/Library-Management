import { memo, useState } from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Paper
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [openMenus, setOpenMenus] = useState({
        theloai: false,
        hubsach: false,
    });

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        <>
            {/* Sidebar */}
            <Box
                sx={{
                    flex: "0 0 250px",
                    alignSelf: "flex-start",
                }}
            >
                <Paper elevation={1} sx={{ width: 250, p: 1, borderRadius: 2 }}>
                    <List component="nav">
                        {/* Thể loại */}
                        <ListItemButton onClick={() => toggleMenu("theloai")}>
                            <ListItemText primary="THỂ LOẠI" />
                            {openMenus.theloai ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openMenus.theloai} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/the-loai">
                                    <ListItemText primary="Tất cả thể loại" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/the-loai/tieu-thuyet">
                                    <ListItemText primary="Tiểu thuyết" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/the-loai/truyen-tranh">
                                    <ListItemText primary="Truyện tranh" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/the-loai/kinh-te">
                                    <ListItemText primary="Kinh tế" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/the-loai/khoa-hoc">
                                    <ListItemText primary="Khoa học" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* Tuyển chọn */}
                        <ListItemButton component={Link} to="/tuyen-chon">
                            <ListItemText primary="TUYỂN CHỌN" />
                        </ListItemButton>

                        {/* Hub sách */}
                        <ListItemButton onClick={() => toggleMenu("hubsach")}>
                            <ListItemText primary="HUB SÁCH" />
                            {openMenus.hubsach ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openMenus.hubsach} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/hub-sach/ha-noi">
                                    <ListItemText primary="SCT Hà Nội" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/hub-sach/ho-chi-minh">
                                    <ListItemText primary="SCT Hồ Chí Minh" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Paper>
            </Box>
        </>
    );
};

export default memo(Sidebar);