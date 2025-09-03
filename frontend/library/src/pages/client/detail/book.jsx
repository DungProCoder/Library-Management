import { memo } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button,
    Chip,
    Rating
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Book = ({ book }) => {
    const avgRating = Number(book.avg_rating) || 0;
    const remainder = avgRating % 1;
    const decimal = remainder === 0 ? 0 : 1 - remainder;

    return (
        <>
            <Grid container spacing={2}>
                {/* Ảnh bìa */}
                <Grid size={4}>
                    <Box
                        component="img"
                        src={book.image}
                        alt="Book cover"
                        sx={{
                            width: "100%",
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    />
                </Grid>

                {/* Nội dung sách */}
                <Grid size={8}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        Đánh giá:
                        <Rating value={Number(book.avg_rating) || 0} precision={decimal} readOnly size="small" />
                        <Typography component="span" fontWeight="medium">
                            ({book.count_rating})
                        </Typography>
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mt: 3, mb: 3 }}>
                        <Button variant="contained" color="primary" sx={{ borderRadius: 5 }}>
                            📗 Mượn Sách
                        </Button>
                        <Button variant="outlined" color="danger" sx={{ borderRadius: 5 }}>
                            <FavoriteBorderIcon />
                        </Button>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, mb: 4 }}>
                        <Chip label={`Thể loại: ${book.category ? book.category.name : ""}`} variant="outlined" />
                        <Chip label="Hub Sách: Sct Bookbus, Sct Tuyển chọn" variant="outlined" />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default memo(Book);