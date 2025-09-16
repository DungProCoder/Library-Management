import { memo, useEffect } from 'react';
import {
    Box,
    Container,
} from '@mui/material';
import Breadcrumb from './breadcrumb';
import BookSearched from './results';

const Search = () => {
    useEffect(() => {
        document.title = "Library - Tìm kiếm sách";
    }, []);
    
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