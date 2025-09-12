import { memo, useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    List,
    ListItem,
    Avatar,
    Rating
} from '@mui/material';

const About = ({ book, ratingBooks }) => {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
                <Tabs value={tab} onChange={handleChange}>
                    <Tab label="Chi tiết" />
                    <Tab label={"Đánh giá (" + book.count_rating + ")"} />
                </Tabs>
            </Box>

            <Box sx={{ mt: 2 }}>
                {tab === 0 && (
                    <Typography variant="body1" color="text.primary">
                        {book.description}
                    </Typography>
                )}
                {tab === 1 && (
                    <Box>
                        {ratingBooks && ratingBooks.length > 0 ? (
                            <List>
                                {ratingBooks.map((review, index) => (
                                    <ListItem alignItems="flex-start" key={index} sx={{ mb: 2 }}>
                                        <Avatar
                                            alt={review.user.name}
                                            src={review.user.avatar}
                                            sx={{ mr: 2 }}
                                        />
                                        <Box>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="subtitle2" fontWeight="bold">
                                                    {review.user.first_name || review.user.last_name
                                                        ? `${review.user.last_name} ${review.user.first_name}`
                                                        : "Ẩn danh"}
                                                </Typography>
                                                <Rating
                                                    value={Number(review.rate) || 0}
                                                    precision={0.5}
                                                    readOnly
                                                    size="small"
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {review.comment}
                                            </Typography>
                                            <Typography variant="caption" color="text.disabled">
                                                {new Date(review.date_add).toLocaleDateString("vi-VN")}
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Chưa có đánh giá nào.
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </>
    );
};

export default memo(About);