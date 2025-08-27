import { memo } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box,
    Rating
} from "@mui/material";

const Book = () => {
    const books = [
        {
            title: "Tội Phạm Học Nhập Môn",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
        },
        {
            title: "Người Truyền Ký Ức",
            image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
        },
        {
            title: "Bí Ẩn Vũ Trụ",
            image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
        },
        {
            title: "Sức Mạnh Của Thói Quen",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794"
        },
        {
            title: "Nhà giả kim",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
        },
        {
            title: "Dám bị ghét",
            image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
        },
    ];

    return (
        <>
            {/* Book Grid */}
            <Box sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                    {books.map((book, idx) => (
                        <Grid key={idx}>
                            <Card
                                sx={{
                                    justifyContent: "space-between",
                                    width: 208,
                                    height: "100%",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    transition: "transform .2s, box-shadow .2s",
                                    "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={book.image}
                                    alt={book.title}
                                    loading="lazy"
                                    sx={{
                                        height: 180,
                                        width: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center"
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="body2">{book.title}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        <Rating value={4.5} precision={0.5} readOnly size="small" />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default memo(Book);