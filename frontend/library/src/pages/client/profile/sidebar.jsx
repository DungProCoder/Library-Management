import { memo } from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    { text: "Tài khoản của tôi", path: "/thong-tin-ca-nhan/thong-tin-lien-he" },
    { text: "Đơn mượn sách của tôi", path: "/thong-tin-ca-nhan/sach-da-muon" },
    { text: "Danh sách yêu thích của tôi", path: "/thong-tin-ca-nhan/sach-yeu-thich" },
    { text: "Cập nhật tài khoản", path: "/thong-tin-ca-nhan/tai-khoan" },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <List sx={{ width: 250, p: 0 }}>
            {menuItems.map((item) => (
                <ListItemButton
                    key={item.text}
                    component={Link}
                    to={item.path}
                    // check active
                    selected={location.pathname === item.path}
                    sx={{
                        "&.Mui-selected": {
                            backgroundColor: "primary.main",
                            color: "white",
                            "& .MuiListItemText-root": {
                                color: "white",
                            },
                        },
                    }}
                >
                    <ListItemText primary={item.text} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default memo(Sidebar);