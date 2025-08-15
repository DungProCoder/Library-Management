import { memo, useState, useMemo } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    MenuItem,
    Select,
    FormControl,
    Card,
    CardMedia,
    CardContent,
    Button,
    Rating,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MOCK_BOOKS = [
    {
        id: 1,
        title: "Trăng mười sáu",
        img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
        rating: 4,
    },
    {
        id: 2,
        title: "Vị giám đốc một phút",
        img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
        rating: 5,
    },
    {
        id: 3,
        title: "Tôi phải lấy pho mát của ai?",
        img: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?q=80&w=600&auto=format&fit=crop",
        rating: 4.5,
    },
    {
        id: 4,
        title: "Heartless - Hoàng hậu cơ",
        img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
        rating: 3.5,
    },
    {
        id: 5,
        title: "Sức mạnh của thói quen",
        img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
        rating: 4,
    },
    {
        id: 6,
        title: "Đắc nhân tâm",
        img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
        rating: 5,
    },
    {
        id: 7,
        title: "Nhà giả kim",
        img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
        rating: 4.5,
    },
    {
        id: 8,
        title: "Dám bị ghét",
        img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
        rating: 4,
    },
];

const LeftBox = () => {
    const [sortBy, setSortBy] = useState("name");
    const [limit, setLimit] = useState(100);

    const sortedBooks = useMemo(() => {
        const copy = [...MOCK_BOOKS];
        if (sortBy === "name") return copy.sort((a, b) => a.title.localeCompare(b.title));
        if (sortBy === "rating") return copy.sort((a, b) => b.rating - a.rating);
        return copy;
    }, [sortBy]);

    return (
        <>
            {/* LEFT: Books grid */}
            {/* Sort / Limit bar */}
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: 3,
                    mb: 2,
                    border: "1px solid",
                    borderColor: "grey.200",
                    bgcolor: "#fff",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Sắp xếp theo
                    </Typography>
                    <FormControl size="small">
                        <Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            startAdornment={<SortIcon sx={{ mr: 1 }} />}
                            displayEmpty
                            sx={{ minWidth: 160 }}
                        >
                            <MenuItem value="name">Tên Sách</MenuItem>
                            <MenuItem value="rating">Đánh giá</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Hiển thị
                    </Typography>
                    <FormControl size="small">
                        <Select
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            sx={{ minWidth: 100 }}
                            IconComponent={KeyboardArrowDownIcon}
                        >
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                            <MenuItem value={48}>48</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            {/* Books */}
            <Grid container spacing={2}>
                {sortedBooks.slice(0, limit).map((b) => (
                    <Grid key={b.id} item xs={6} sm={4} md={3}>
                        <Card
                            sx={{
                                width: 240,
                                height: 330,
                                borderRadius: 3,
                                overflow: "hidden",
                                transition: "transform .2s, box-shadow .2s",
                                "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    height: 210,
                                    width: "100%",
                                    objectFit: "cover",
                                    backgroundColor: "#f5f5f5",
                                }} image={b.img}
                                alt={b.title}
                            />
                            <CardContent sx={{ pt: 1.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    gutterBottom
                                    sx={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                                >
                                    {b.title}
                                </Typography>
                                <Rating name="read-only" size="small" precision={0.5} value={b.rating} readOnly />
                                <Box sx={{ mt: 1.5 }}>
                                    <Button variant="contained" size="small" fullWidth>
                                        ✅ MƯỢN SÁCH
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default memo(LeftBox);