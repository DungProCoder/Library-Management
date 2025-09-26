import { memo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import API from "../../../servers/api";
import KeywordInput from "../components/keywords";

const FAQEdit = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const validate = () => {
        const newErrors = {};
        if (!question.trim()) newErrors.question = "Câu hỏi không được để trống";
        if (!answer.trim()) newErrors.answer = "Câu trá lời không được để trống";
        if (!keywords.length) newErrors.keywords = "Vui lòng thêm ít nhất một từ khóa";

        return newErrors;
    };

    useEffect(() => {
        const fetchFAQ = async () => {
            try {
                const res = await API.get(`/admin/faqs/${id}/`);
                const data = res.data;
                setQuestion(data.question);
                setAnswer(data.answer);
                setKeywords(data.keywords);
            } catch (error) {
                console.error("Failed to fetch FAQ:", error);
            }
        }

        fetchFAQ();
    }, [id]);

    useEffect(() => {
        document.title = "Library - Quản trị - Thêm mới FAQ";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = validate();
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            return;
        }

        try {
            await API.put(`/admin/faqs/${id}/`, {
                question,
                answer,
                keywords,
            });
            setSuccess(true);
            setQuestion("");
            setAnswer("");
            setKeywords([]);
            setTimeout(() => navigate("/admin/faqs"), 1000);
        } catch (error) {
            console.error("Failed to fetch FAQs:", error);
        }
    };

    return (
        <Box sx={{ margin: "0 auto", padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    ➕ Thêm mới FAQ
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Câu hỏi"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.question}
                        helperText={errors.question}
                    />

                    <TextField
                        label="Câu trả lời"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.answer}
                        helperText={errors.answer}
                    />

                    <KeywordInput value={keywords} onChange={setKeywords} />

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
                            Lưu
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Box sx={{ p: 1, mt: 2 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/admin/faqs")}
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
                    ✅ Lưu FAQ thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(FAQEdit);