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
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../servers/api";

const BookAdd = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [isSeries, setIsSeries] = useState(false);
    const [series, setSeries] = useState("");
    const [volume, setVolume] = useState("");
    const [seriesList, setSeriesList] = useState([]);
    const [categories, setCategories] = useState([]);

    const [success, setSuccess] = useState(false);
    const [errors, setError] = useState({});
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Tên sách không được để trống";
        if (!author.trim()) newErrors.author = "Tác giả không được để trống";
        if (!image) newErrors.image = "Ảnh bìa không được để trống";
        if (!description.trim()) newErrors.description = "Mô tả không được để trống";
        if (quantity <= 0) newErrors.quantity = "Số lượng phải lớn hơn 0";
        if (!category) newErrors.category = "Thể loại không được để trống";

        return newErrors;
    }

    const fetchCategories = async () => {
        try {
            const response = await API.get("/admin/categories/");
            setCategories(response.data.results);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const fetchSeries = async () => {
        try {
            const response = await API.get("/admin/book-series/");
            setSeriesList(response.data.results);
        } catch (error) {
            console.error("Failed to fetch series book:", error);
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await API.get(`/admin/books/${id}`);
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setDescription(response.data.description);
                setQuantity(response.data.quantity);
                setCategory(response.data.category?.id);
                setSeries(response.data.series?.id);
                setVolume(response.data.volume_number);

                if (response.data.image) {
                    setImage(response.data.image);
                    setPreview(response.data.image);
                }
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };
        fetchBooks();
        fetchCategories();
        fetchSeries();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = validate();
        if (Object.keys(validateErrors).length > 0) {
            setError(validateErrors);
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("category_id", category);
        if (image instanceof File) formData.append("image", image);
        if (isSeries) {
            formData.append("series_id", series);
            formData.append("volume_number", volume);
        }

        try {
            await API.put(`/admin/books/${id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess(true);
            setTimeout(() => navigate("/admin/books/"), 1000);
        } catch (error) {
            console.error("Failed to add book:", error);
            setError({ general: "Có lỗi xảy ra, vui lòng thử lại sau." });
        }
    };

    return (
        <Box sx={{ margin: "0 auto", padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    ✏️ Sửa sách
                </Typography>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <TextField
                        label="Tên sách"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title}
                    />

                    <TextField
                        label="Tác giả"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.author}
                        helperText={errors.author}
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
                            onChange={handleImageChange}
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
                    {errors.image && (
                        <Typography color="error" variant="body2">
                            {errors.image}
                        </Typography>
                    )}

                    <TextField
                        label="Mô tả"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description}
                    />

                    <TextField
                        label="Số lượng"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                    />

                    <TextField
                        select
                        label="Thể loại"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.category}
                        helperText={errors.category}
                    >
                        {categories.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isSeries}
                                onChange={(e) => setIsSeries(e.target.checked)}
                            />
                        }
                        label="Thuộc tuyển tập"
                    />

                    {isSeries && (
                        <>
                            <TextField
                                select
                                label="Tuyển tập"
                                value={series}
                                onChange={(e) => setSeries(e.target.value)}
                                fullWidth
                                margin="normal"
                            >
                                {seriesList.map((s) => (
                                    <MenuItem key={s.id} value={s.id}>
                                        {s.title}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Tập số"
                                type="number"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    )}

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
                            Lưu thay đổi
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
                    ✅ Lưu thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(BookAdd);
