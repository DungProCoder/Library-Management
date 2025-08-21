import { memo, useState, useEffect } from "react";
import {
    Box,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Button,
    Paper,
    Typography,
    Snackbar,
    Alert,
    MenuItem,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
import API from "../../../servers/api";

const BookAdd = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("admin/categories/").then((res) => {
            setCategories(res.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        API.post("/books/", {
            title,
            author,
            image,
            description,
            quantity,
            category,
        }).then(() => {
            setSuccess(true);
            setTitle("");
            setAuthor("");
            setQuantity(1);
            setCategory("");
        });
    };

    return (
        <Box sx={{ margin: "0 auto", padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    ➕ Thêm sách mới
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tên sách"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Tác giả"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload Ảnh
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </Button>
                    <Card sx={{ maxWidth: 200, mt: 2 }}>
                        {preview ? (
                            <CardMedia
                                component="img"
                                height="250"
                                image={preview}
                                alt="Book Cover"
                                sx={{ objectFit: "cover" }}
                            />
                        ) : (
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography variant="body2" color="text.secondary">
                                    Chưa cập nhật ảnh
                                </Typography>
                            </CardContent>
                        )}
                    </Card>

                    <TextField
                        label="Mô tả"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Số lượng"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        select
                        label="Thể loại"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    >
                        {categories.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                maxWidth: 150,
                                width: "100%",
                            }}
                        >
                            Thêm sách
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Box sx={{ p: 1, mt: 2 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/admin/categories")}
                >
                    <KeyboardReturnIcon /> Quay lại
                </Button>
            </Box>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    ✅ Thêm sách thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(BookAdd);
