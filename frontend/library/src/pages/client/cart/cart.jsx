import { memo, useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CardMedia,
    IconButton,
    Button,
    Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Người Nam Châm",
            hub: "Sct Tuyển chọn",
            cover: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_139949.jpg",
            status: "Còn sẵn",
        },
    ]);

    const handleRemove = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    return (
        <>
            <Paper sx={{ p: 2, mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Sách</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Tình trạng</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <CardMedia
                                            component="img"
                                            image={item.cover}
                                            alt={item.title}
                                            sx={{ width: 80, height: 110, borderRadius: 1 }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1">{item.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Hub: {item.hub}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="primary"
                                                sx={{ mt: 1, cursor: "pointer" }}
                                            >
                                                Chuyển tới danh sách yêu thích
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell align="center">
                                    <Grid item xs={3}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: item.status === "Còn sẵn" ? "green" : "red",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {item.status}
                                        </Typography>
                                    </Grid>
                                </TableCell>

                                <TableCell align="center">
                                    <IconButton onClick={() => handleRemove(item.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 10, px: 4 }}
                >
                    TIẾN HÀNH ĐẶT
                </Button>
            </Box>
        </>
    );
};

export default memo(CartPage);