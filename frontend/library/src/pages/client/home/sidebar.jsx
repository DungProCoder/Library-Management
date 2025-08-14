import { memo } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

const Sidebar = () => {
    const categories = [
        "Tuyển tập",
        "Tiểu thuyết",
        "Truyện ngắn",
        "Thơ",
        "Tản văn - Tuỳ bút",
        "Tiểu sử - Danh nhân",
        "Văn hoá - Lịch sử - Du lịch",
        "Tôn giáo - Triết học - Tâm lý",
    ];

    return (
        <>
            {/* Sidebar */}
            <Box
                sx={{
                    flex: "0 0 250px",
                    alignSelf: "flex-start",
                }}
            >
                <Card>
                    <CardContent>
                        <Typography variant="h6">Thể loại</Typography>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {categories.map((category, idx) => (
                                <li key={idx} style={{ padding: "8px 0" }}>
                                    <Link
                                        to={`/category/${category.slug}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default memo(Sidebar);