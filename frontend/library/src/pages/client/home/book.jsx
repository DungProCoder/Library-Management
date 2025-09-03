import { memo, useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box,
    Rating,
    CardActionArea
} from "@mui/material";
import { Link } from "react-router-dom";
import API from "../../../servers/api";

const Book = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await API.get("/client/books/");
            setBooks(response.data);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

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
                                    bgcolor: "background.paper",
                                    "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                                }}
                            >
                                <CardActionArea
                                    component={Link}
                                    to={`/${book.isbn}`}
                                    disableRipple
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "transparent !important",
                                        },
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
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default memo(Book);