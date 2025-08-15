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

const Category = () => {
    return (
        <>
            <Box sx={{ minHeight: "100vh", pb: 6 }}>
                {/* Breadcrumb */}
                <Breadcrumb />

                {/* Banner */}
                <Banner />

                <Container>
                    <Grid container spacing={3}>
                        <Grid size={8} item xs={12} md={9}>
                            <LeftBox />
                        </Grid>
                        <Grid size={4} item xs={12} md={3}>
                            <RightBox />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default memo(Category);