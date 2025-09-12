import { memo, useEffect, useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Rating,
    Select,
    MenuItem,
    Pagination,
} from "@mui/material";
import { useSearch } from "../context/SearchContext";
import API from "../../../servers/api";

const BookSearched = () => {
    const { searchQuery } = useSearch();  // lấy query từ Context
    const [sort, setSort] = useState("rating");
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 8;
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const params = new URLSearchParams();
                params.append('page', page);

                if (searchQuery) {
                    params.append('search', searchQuery);
                }

                if (sort === 'newest') {
                    params.append('ordering', '-date_add');
                } else if (sort === 'rating') {
                    params.append('ordering', '-avg_rating_db');
                } else {
                    params.append('ordering', '');
                }

                const response = await API.get(`/client/books/search/?${params.toString()}`);
                setBooks(response.data.results || []);
                setTotalCount(response.data.count || 0);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };
        fetchBooks();
    }, [searchQuery, sort, page]);

    const handleAddToBorrow = async (bookId) => {
        try {
            await API.post("/client/borrow-requests/", { book_id: bookId });
            alert("✅ Đã thêm vào giỏ mượn!");
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                if (err.response.data.book) {
                    alert("⚠️ " + err.response.data.book);
                } else if (err.response.data.limit) {
                    alert("⚠️ " + err.response.data.limit);
                } else {
                    alert("❌ Không thể thêm vào giỏ mượn.");
                }
            } else {
                alert("❌ Có lỗi xảy ra, vui lòng thử lại.");
            }
        }
    }

    return (
        <Box sx={{ mt: 3 }}>
            {/* Ô tìm kiếm */}
            <Box display="flex" justifyContent="flex-start" mb={3}>
                <Select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                    size="small"
                >
                    <MenuItem value="rating">Đánh Giá Cao</MenuItem>
                    <MenuItem value="newest">Mới Nhất</MenuItem>
                </Select>
            </Box>

            <Typography variant="h6" mb={2}>
                Kết quả tìm kiếm cho: "{searchQuery}"
            </Typography>

            {/* Danh sách sách */}
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid size={3} key={book.id}>
                        <Card sx={{ borderRadius: 3, height: "100%" }}>
                            <CardMedia
                                component="img"
                                image={book.image}
                                alt={book.title}
                                sx={{ height: 200, objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                    {book.title}
                                </Typography>
                                <Rating
                                    value={Number(book.avg_rating)}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    onClick={() => handleAddToBorrow(book.id)}
                                >
                                    MƯỢN SÁCH NGAY
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

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
        </Box>
    );
};

export default memo(BookSearched);
