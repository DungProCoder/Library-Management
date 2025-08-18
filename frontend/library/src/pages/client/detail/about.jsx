import { memo, useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab
} from '@mui/material';

const About = () => {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
                <Tabs value={tab} onChange={handleChange}>
                    <Tab label="Chi tiết" />
                    <Tab label="Giới thiệu sách" />
                </Tabs>
            </Box>

            <Box sx={{ mt: 2 }}>
                {tab === 0 && (
                    <Typography variant="body1" color="text.primary">
                        Đây là phần chi tiết của sách (ví dụ: Tác giả, Năm xuất bản, Nhà xuất bản, ISBN...).
                    </Typography>
                )}
                {tab === 1 && (
                    <Typography variant="body1" color="text.primary">
                        Bạn sẽ tìm thấy gì trong cuốn sách này? Sự thông minh, hài hước,
                        chiêm nghiệm sâu sắc về thiền định, cuộc sống, tình yêu, tuổi tác,
                        giá trị thật sự của bản thân, …
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default memo(About);