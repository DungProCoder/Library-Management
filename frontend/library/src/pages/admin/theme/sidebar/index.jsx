import { memo } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CategoryIcon from "@mui/icons-material/Category";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { text: "Bảng điều khiển", icon: <DashboardIcon />, path: "/admin" },
        { text: "Quản lý sách", icon: <LibraryBooksIcon />, path: "/admin/books" },
        { text: "Thể loại", icon: <CategoryIcon />, path: "/admin/categories" },
        { text: "Tuyển tập", icon: <CollectionsBookmarkIcon />, path: "/admin/series" },
        { text: "Người dùng", icon: <PeopleIcon />, path: "/admin/users" },
        { text: "Mượn/Trả sách", icon: <AssignmentIcon />, path: "/admin/borrow" },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    backgroundColor: "#1976d2",
                    color: "white",
                },
            }}
        >
            <h2 style={{ padding: "16px", textAlign: "center" }}>📚 Library Admin</h2>
            <List>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <ListItem
                            key={item.text}
                            disablePadding
                        >
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                sx={{
                                    backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{ color: isActive ? "#ffeb3b" : "white", minWidth: 40 }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: isActive ? "#ffeb3b" : "white", fontWeight: isActive ? "bold" : "normal" }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default memo(Sidebar);