import { memo } from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";

const RelatedBooks = () => {
    const books = [
        {
            id: 1,
            title: "Trăng mười sáu",
            img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
            author: "Nguyễn Nhật Ánh",
        },
        {
            id: 2,
            title: "Vị giám đốc một phút",
            img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
            author: "Nguyễn Nhật Ánh",
        },
        {
            id: 3,
            title: "Tôi phải lấy pho mát của ai?",
            img: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?q=80&w=600&auto=format&fit=crop",
            author: "Nguyễn Nhật Ánh",
        },
        {
            id: 4,
            title: "Heartless - Hoàng hậu cơ",
            img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
            author: "Nguyễn Nhật Ánh",
        },
        {
            id: 5,
            title: "Sức mạnh của thói quen",
            img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
            author: "Nguyễn Nhật Ánh",
        },
        {
            id: 6,
            title: "Đắc nhân tâm",
            img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
            author: "Nguyễn Nhật Ánh",
        },
        {
            id: 7,
            title: "Nhà giả kim",
            img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
            author: "Nguyễn Nhật Ánh",
        },
        {
            id: 8,
            title: "Dám bị ghét",
            img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
            author: "Nguyễn Nhật Ánh",
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h6" gutterBottom>
                📚 Sách liên quan
            </Typography>
            <Slider {...settings}>
                {books.map((book) => (
                    <Box key={book.id} sx={{ px: 1 }}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={book.image}
                                alt={book.title}
                                sx={{ height: 200, objectFit: "contain", p: 2 }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                    {book.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {book.author}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Xem chi tiết</Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default memo(RelatedBooks);
