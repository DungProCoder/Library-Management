import { memo } from 'react';
import {
    Box,
    Container,
} from '@mui/material';
import Breadcrumb from './breadcrumb';
import BookSearched from './results';

const Search = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Container maxWidth="lg">
                {/* Breadcrumb */}
                <Breadcrumb />

                {/* Kết quả tìm kiếm */}
                <BookSearched />
            </Container>
        </Box>
    )
};

export default memo(Search);