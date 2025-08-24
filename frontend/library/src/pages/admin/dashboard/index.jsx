import { memo } from "react";
import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Dashboard = () => {
    const stats = {
        totalBooks: 120,
        totalUsers: 56,
        borrowing: 24,
        returned: 96,
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
                📊 Bảng điều khiển
            </Typography>

            <Grid container spacing={3}>
                {/* Tổng số sách */}
                <Grid size={3}>
                    <Card sx={{ bgcolor: "#e3f2fd", borderRadius: 3 }}>
                        <CardContent>
                            <BookIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                            <Typography variant="h4">{stats.totalBooks}</Typography>
                            <Typography color="text.secondary">Tổng số sách</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Tổng số người dùng */}
                <Grid size={3}>
                    <Card sx={{ bgcolor: "#f1f8e9", borderRadius: 3 }}>
                        <CardContent>
                            <PeopleIcon sx={{ fontSize: 40, color: "#388e3c" }} />
                            <Typography variant="h4">{stats.totalUsers}</Typography>
                            <Typography color="text.secondary">Tổng số người dùng</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Đang mượn */}
                <Grid size={3}>
                    <Card sx={{ bgcolor: "#fff3e0", borderRadius: 3 }}>
                        <CardContent>
                            <AccessTimeIcon sx={{ fontSize: 40, color: "#f57c00" }} />
                            <Typography variant="h4">{stats.borrowing}</Typography>
                            <Typography color="text.secondary">Đang mượn</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Đã trả */}
                <Grid size={3}>
                    <Card sx={{ bgcolor: "#f3e5f5", borderRadius: 3 }}>
                        <CardContent>
                            <CheckCircleIcon sx={{ fontSize: 40, color: "#7b1fa2" }} />
                            <Typography variant="h4">{stats.returned}</Typography>
                            <Typography color="text.secondary">Đã trả</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default memo(Dashboard);
