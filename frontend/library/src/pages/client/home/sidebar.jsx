import { memo, useState, useEffect } from "react";
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
import API from "../../../servers/api";

const Sidebar = () => {
    const [categories, setCategories] = useState([]);
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

    const fetchCategories = async () => {
        try {
            const response = await API.get("/client/categories/");
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

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
                                {categories.map((category) => (
                                    <ListItemButton sx={{ pl: 4 }} component={Link} to={`/the-loai/${category.slug}`} key={category.id}>
                                        <ListItemText primary={category.name} />
                                    </ListItemButton>
                                ))}
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