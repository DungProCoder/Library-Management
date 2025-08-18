import { memo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const sidebarItems = [
    {
        title: "Nhận sách",
        subtitle: "Tại trung tâm sách",
        icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
        title: "Mở cửa mỗi ngày",
        subtitle: "9h-12h & 16h-19h",
        icon: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    },
    {
        title: "Hỗ trợ online",
        subtitle: "Zalo, Messenger",
        icon: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
    },
];

const Sidebar = () => {
    return (
        <>
            {sidebarItems.map((item, i) => (
                <Card key={i} sx={{ mb: 2 }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                            component="img"
                            src={item.icon}
                            alt={item.title}
                            sx={{ width: 40, height: 40 }}
                        />
                        <Box>
                            <Typography fontWeight="bold">{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.subtitle}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default memo(Sidebar);
