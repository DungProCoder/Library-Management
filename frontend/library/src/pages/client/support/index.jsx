import { memo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Avatar,
    Stack,
    Divider,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import API from "../../../servers/api";

const SupportPage = () => {
    const [messages, setMessages] = useState([
        { from: "support", text: "Xin chào! Bạn cần hỗ trợ gì không?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        let newErrors = {};
        if (!form.name.trim()) newErrors.name = "Vui lòng nhập tên";
        if (!form.email.trim()) newErrors.email = "Vui lòng nhập email";
        if (!form.message.trim()) newErrors.message = "Vui lòng nhập vấn đề bạn gặp phải";
        return newErrors;
    };

    const handleFeedback = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await API.post("/client/faqs/", {
                question: form.message,
            });
            setSuccess(true);
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.log("Feedback error", error);
        }
    }

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { from: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await API.post("/client/chat/", { message: input });

            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { from: "support", text: res.data.reply },
                ]);
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log("Chat error", error);
            setMessages((prev) => [
                ...prev,
                { from: "support", text: "Lỗi kết nối. Vui lòng thử lại." },
            ]);
        }
    };

    useEffect(() => {
        document.title = "Library - Hỗ trợ khách hàng";
    }, []);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
            }}
        >
            <Typography variant="h4" fontWeight="bold">
                HỖ TRỢ KHÁCH HÀNG
            </Typography>

            {/* Contact Form */}
            <Card sx={{ width: "100%", maxWidth: 800 }}>
                <CardContent>
                    <form onSubmit={handleFeedback}>
                        <Typography variant="h6" gutterBottom>
                            📩 Liên hệ với chúng tôi
                        </Typography>

                        <Stack spacing={2}>
                            <TextField
                                label="Tên của bạn"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Email của bạn"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Vấn đề bạn gặp phải là gì?"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                                required
                            />

                            <Button type="submit" variant="contained" fullWidth>
                                Gửi
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>

            {/* Chat Box */}
            <Card sx={{ width: "100%", maxWidth: 800 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        💬 Trò chuyện trực tuyến
                    </Typography>
                    <Box
                        sx={{
                            height: 300,
                            overflowY: "auto",
                            bgcolor: "#fff",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            p: 2,
                            mb: 2,
                        }}
                    >
                        {messages.map((msg, idx) => (
                            <Stack
                                key={idx}
                                direction="row"
                                spacing={1}
                                justifyContent={msg.from === "user" ? "flex-end" : "flex-start"}
                                mb={1}
                            >
                                {msg.from === "support" && (
                                    <Avatar sx={{ bgcolor: "primary.main" }}>
                                        <SupportAgentIcon />
                                    </Avatar>
                                )}
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 2,
                                        maxWidth: "70%",
                                        bgcolor:
                                            msg.from === "user"
                                                ? (theme) => alpha(theme.palette.primary.main, 0.3)
                                                : "grey.200",
                                    }}
                                >
                                    <Typography variant="body2">{msg.text}</Typography>
                                </Box>
                                {msg.from === "user" && (
                                    <Avatar sx={{ bgcolor: "secondary.main" }}>
                                        <PersonIcon />
                                    </Avatar>
                                )}
                            </Stack>
                        ))}
                        {loading && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "left",
                                    gap: 1,
                                    p: 1.5,
                                    borderRadius: 2,
                                    maxWidth: "19%",
                                    bgcolor: "grey.200",
                                }}
                            >
                                <CircularProgress size={16} />
                                <Typography variant="body2">Đang trả lời...</Typography>
                            </Box>
                        )}
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Nhập tin nhắn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        />
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                            disabled={loading}
                        >
                            Gửi
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    ✅ Đã gửi thành công. Chúng tôi sẽ xem xét và cho bạn câu trả lời sớm nhất có thể!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default memo(SupportPage);
