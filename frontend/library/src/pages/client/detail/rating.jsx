import { memo, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Rating,
    TextField,
    Button,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';
import API from '../../../servers/api';

const RatingForm = ({ book }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const [success, setSuccess] = useState(false);

    const [userRating, setUserRating] = useState(null);

    const userId = user && typeof user === "object" ? user.id : null;
    const bookId = book?.id ?? null;

    useEffect(() => {
        const fetchUserRating = async () => {
            if (!userId || !bookId) return;

            try {
                const response = await API.get(`/client/user/books/${bookId}/rated/`);
                setUserRating(response.data);
            } catch (error) {
                if (error.response && error.response?.status === 404) {
                    setUserRating(null);
                } else {
                    console.error('Failed to fetch user rating:', error);
                }
            }

        };
        fetchUserRating();
    }, [userId, bookId]);

    const handleRatingSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('rate', rating);
        formData.append('comment', comment);
        formData.append('book', book.id);
        formData.append('user', user.id);

        try {
            await API.post(`/client/rating/`, formData)

            setSuccess(true);
            window.location.reload();
        } catch (error) {
            console.error('Failed to add rating:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            {user ? (
                userRating ? (
                    <Alert severity="info">
                        📌 Bạn đã đánh giá sách này!
                    </Alert>
                ) : (
                    <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Đánh giá sách
                        </Typography>
                        <form onSubmit={handleRatingSubmit}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Typography sx={{ mr: 2 }}>Chọn số sao:</Typography>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    onChange={(e, newValue) => setRating(newValue)}
                                    size="large"
                                />
                            </Box>
                            <TextField
                                label="Nội dung đánh giá..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                variant="outlined"
                                fullWidth
                                multiline
                                minRows={4}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type='submit' variant="contained" color="primary">
                                    Gửi đánh giá
                                </Button>
                            </Box>
                        </form>

                        <Snackbar
                            open={success}
                            autoHideDuration={3000}
                            onClose={() => setSuccess(false)}
                        >
                            <Alert severity="success" onClose={() => setSuccess(false)}>
                                ✅ Đã đánh giá thành công!
                            </Alert>
                        </Snackbar>
                    </>
                )
            ) : (
                <Typography variant="body1" color="text.secondary">
                    Vui lòng đăng nhập để đánh giá sách.
                </Typography>
            )}
        </Paper>
    );
};

export default memo(RatingForm);