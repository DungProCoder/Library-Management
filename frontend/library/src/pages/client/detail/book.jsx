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

const Book = () => {
    return (
        <>
            <Grid container spacing={2}>
                {/* Ảnh bìa */}
                <Grid size={4} item xs={12} md={4}>
                    <Box
                        component="img"
                        src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509.jpg"
                        alt="Book cover"
                        sx={{
                            width: "100%",
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    />
                </Grid>

                {/* Nội dung sách */}
                <Grid size={8} item xs={12} md={8}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Nghiêm Túc Thì... Tôi Chỉ Đùa Thôi
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        Đánh giá:
                        <Rating value={4.5} precision={0.5} readOnly size="small" />
                        <Typography component="span" fontWeight="medium">
                            (120)
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
                        <Chip label="Thể Loại: Tôn giáo triết học tâm lý" variant="outlined" />
                        <Chip label="Hub Sách: Sct Bookbus, Sct Tuyển chọn" variant="outlined" />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default memo(Book);