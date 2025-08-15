import { memo, useState } from 'react';
import {
    Paper,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";

const CATEGORIES = [
    "Tuyển tập",
    "Tiểu thuyết",
    "Truyện ngắn",
    "Thơ",
    "Tản văn - Tùy bút - Tiểu luận văn học",
    "Tiểu sử - Danh nhân - Phóng sự",
    "Văn hoá - Địa sử - Nhân học - Du lịch",
    "Tôn giáo - Triết học - Tâm lý",
    "Kiến trúc - Nghệ thuật",
    "Chính trị - Luật pháp",
    "Đời sống cá nhân - Gia đình",
    "Kinh tế - Lãnh đạo - Quản lý",
    "Khoa học tự nhiên",
];

const LeftBox = () => {
    const [activeCat, setActiveCat] = useState(CATEGORIES[0]);

    return (
        <>
            {/* RIGHT: Sidebar categories */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    position: { md: "sticky" },
                    top: { md: 16 },
                    border: "1px solid",
                    borderColor: "grey.200",
                }}
                elevation={0}
            >
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                    THỂ LOẠI
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <List disablePadding>
                    {CATEGORIES.map((c) => {
                        const active = c === activeCat;
                        return (
                            <ListItemButton
                                key={c}
                                onClick={() => setActiveCat(c)}
                                sx={{
                                    borderRadius: 2,
                                    mb: 0.5,
                                    bgcolor: active ? "grey.100" : "transparent",
                                    "&:hover": { bgcolor: "grey.100" },
                                }}
                            >
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: active ? 600 : 400,
                                        lineHeight: 1.3,
                                    }}
                                    primary={c}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Paper>
        </>
    );
}

export default memo(LeftBox);