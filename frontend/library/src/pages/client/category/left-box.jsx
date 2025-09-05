import { memo, useState, useEffect } from 'react';
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
    Pagination
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import API from "../../../servers/api";

const LeftBox = ({ category }) => {
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState("name"); // 'name' | 'rating'
    const [limit, setLimit] = useState(24);       // page_size
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.append("page", page);
                params.append("page_size", limit);

                if (category) params.append("category", category);

                // map sortBy to backend ordering param
                if (sortBy === "rating") params.append("ordering", "-avg_rating");
                else params.append("ordering", "title");

                const response = await API.get(`/client/books/?${params.toString()}`);
                const data = response.data;

                setBooks(data.results ?? []);
                setTotalCount(data.count ?? 0);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [page, limit, category, sortBy]);

    return (
        <>
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
                            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                            startAdornment={<SortIcon sx={{ mr: 1 }} />}
                            sx={{ minWidth: 160 }}
                        >
                            <MenuItem value="name">Tên sách</MenuItem>
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
                            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                            sx={{ minWidth: 100 }}
                            IconComponent={KeyboardArrowDownIcon}
                        >
                            <MenuItem value={24}>24</MenuItem>
                            <MenuItem value={48}>48</MenuItem>
                            <MenuItem value={72}>72</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            {/* Books */}
            {loading ? (
                <Typography>Đang tải...</Typography>
            ) : books.length === 0 ? (
                <Typography sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
                    📚 Chưa cập nhật sách trong danh mục này
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {books.map((b) => (
                        <Grid item key={b.id}>
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
                                    }}
                                    image={b.image}
                                    alt={b.title}
                                />
                                <CardContent
                                    sx={{
                                        pt: 1.5,
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        gutterBottom
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {b.title}
                                    </Typography>
                                    <Rating
                                        name="read-only"
                                        size="small"
                                        precision={5 - Number(b.avg_rating)}
                                        value={b.avg_rating ?? 0}
                                        readOnly
                                    />
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
            )}

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                <Pagination
                    count={Math.max(1, Math.ceil(totalCount / limit))}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                    shape="rounded"
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{ mt: 3, display: "flex", justifyContent: "center" }}
                />
            </Box>
        </>
    );
};

export default memo(LeftBox);