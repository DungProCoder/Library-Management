import { memo } from 'react';
import {
    Box,
    Grid,
    Container
} from '@mui/material';
import Breadcrumb from './breadcrumd';
import Book from './book';
import About from './about';
import Sidebar from './sidebar';
import RelatedBooks from './related-books';

const BookDetail = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={8} item xs={12} md={8}>
                        {/* Breadcrumb */}
                        <Breadcrumb />

                        {/* Book Details */}
                        <Book />
                        <About />
                    </Grid>
                    <Grid size={4} item xs={12} md={4} sx={{ mt: 5 }}>
                        <Sidebar />
                    </Grid>
                </Grid>
                
                {/* Related Books */}
                <RelatedBooks />
            </Container>
        </Box>
    );
}

export default memo(BookDetail);