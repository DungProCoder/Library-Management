import { memo, useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Container
} from '@mui/material';
import { useParams } from 'react-router-dom';
import API from '../../../servers/api';
import Breadcrumb from './breadcrumd';
import Book from './book';
import About from './about';
import Sidebar from './sidebar';
import RelatedBooks from './related-books';
import Rating from './rating';

const BookDetail = () => {
    const { isbn } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await API.get(`/client/books/${isbn}`);
                setBook(response.data[0]);
            } catch (error) {
                console.error('Failed to fetch book:', error);
            }
        };
        fetchBook();
    }, [isbn]);

    if (!book) return <p>Loading...</p>;

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={8}>
                        {/* Breadcrumb */}
                        <Breadcrumb book={book} />

                        {/* Book Details */}
                        <Book book={book} />

                        {/* About Book */}
                        <About book={book} />

                        {/* Rating */}
                        <Rating book={book} />
                    </Grid>
                    <Grid size={4} sx={{ mt: 5 }}>
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