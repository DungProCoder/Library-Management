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
                    <Tab label="Đánh giá" />
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
                        Đánh giá
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default memo(About);