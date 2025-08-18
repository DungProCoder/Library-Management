import { memo } from 'react';
import {
    Box,
    Typography,
    Container
} from "@mui/material";
import CartPage from './cart';

const Cart = () => {
    return (
        <>
            <Box sx={{ p: 2 }}>
                <Container maxWidth="lg">
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                        Sách đăng ký mượn
                    </Typography>

                    {/* Cart */}
                    <CartPage />
                </Container>
            </Box>
        </>
    );
}

export default memo(Cart);