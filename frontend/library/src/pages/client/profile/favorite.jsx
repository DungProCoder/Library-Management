import { memo, useEffect, useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import API from "../../../servers/api";
import { Link } from "react-router-dom";

const FavoriteList = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favLoading, setFavLoading] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await API.get("/client/favorites/");
                setFavorites(res.data.results || res.data);
            } catch (err) {
                console.error("Failed to fetch favorites", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (bookId, favId) => {
        setFavLoading((prev) => ({ ...prev, [favId]: true }));
        try {
            const res = await API.post(`/client/books/${bookId}/favorite/`);
            if (!res.data.favorited) {
                setFavorites((prev) => prev.filter((f) => f.id !== favId));
                setSuccess(true);
            }
        } catch (err) {
            console.error("Remove favorite failed", err);
        } finally {
            setFavLoading((prev) => ({ ...prev, [favId]: false }));
        }
    };


    if (loading) return <Typography align="center">Đang tải danh sách yêu thích...</Typography>;

    if (favorites.length === 0)
        return (
            <Typography align="center">
                Bạn chưa có sách nào trong danh sách yêu thích 📚
            </Typography>
        );

    return (
        <Box p={3} sx={{ flex: 1, backgroundColor: "#f7f8fa" }}>
            <Typography variant="h5" gutterBottom>
                Danh sách sách yêu thích
            </Typography>

            <Grid container spacing={3}>
                {favorites.map((fav) => (
                    <Grid size={4} key={fav.id}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* Ảnh sách */}
                            <CardMedia
                                component="img"
                                height="220"
                                image={fav.book.image || "/placeholder-book.png"}
                                alt={fav.book.title}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" fontWeight="bold" noWrap>
                                    {fav.book.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {fav.book.author}
                                </Typography>
                            </CardContent>
                            {/* Action buttons */}
                            <Grid container spacing={1} sx={{ p: 2 }}>
                                <Grid size={12}>
                                    <Button
                                        component={Link}
                                        to={`/${fav.book.isbn}`}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ borderRadius: 5 }}
                                    >
                                        Chi tiết
                                    </Button>
                                </Grid>
                                <Grid size={12}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="error"
                                        sx={{ borderRadius: 5 }}
                                        onClick={() => handleRemoveFavorite(fav.book.id, fav.id)}
                                        disabled={favLoading[fav.id]}
                                        startIcon={
                                            favLoading[fav.id] ? (
                                                <CircularProgress size={18} />
                                            ) : (
                                                <FavoriteIcon />
                                            )
                                        }
                                    >
                                        Bỏ thích
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Snackbar thành công */}
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" variant="filled" onClose={() => setSuccess(false)}>
                    Đã xóa khỏi danh sách yêu thích!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(FavoriteList);
