import { memo } from 'react';
import {
    Box,
    Grid,
    Container,
} from "@mui/material";
import LeftBox from './left-box';
import RightBox from './right-box';
import Breadcrumb from './breadcrumb';
import Banner from './banner';
import { useCategory } from '../context/CategoryContext';

const Category = () => {
    const { selectedCategory } = useCategory();

    return (
        <>
            <Box sx={{ minHeight: "100vh", pb: 6 }}>
                {/* Breadcrumb */}
                <Breadcrumb />

                {/* Banner */}
                <Banner />

                <Container>
                    <Grid container spacing={3}>
                        <Grid size={8}>
                            <LeftBox category={selectedCategory} />
                        </Grid>
                        <Grid size={4}>
                            <RightBox />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default memo(Category);