import { memo } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box
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
    ];

    return (
        <>
            {/* Book Grid */}
            <Box sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                    {books.map((book, idx) => (
                        <Grid item xs={6} sm={4} md={3} key={idx}>
                            <Card sx={{ justifyContent: "space-between", width: 208, height: "100%" }}>
                                <CardMedia
                                    component="img"
                                    image={book.image}
                                    alt={book.title}
                                    loading="lazy"
                                    sx={{
                                        height: 150,
                                        width: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center"
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="body2">{book.title}</Typography>
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