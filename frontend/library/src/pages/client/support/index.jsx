import { memo, useState } from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,
    Card,
    CardContent,
    Avatar,
    Stack,
    Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";

const SupportPage = () => {
    const [messages, setMessages] = useState([
        { from: "support", text: "Xin chào! Bạn cần hỗ trợ gì không?" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: "user", text: input }]);
        setInput("");
    };

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

            {/* FAQ */}
            <Card sx={{ width: "100%", maxWidth: 800 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        ❓ Câu hỏi thường gặp
                    </Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Làm thế nào để mượn sách?</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ fontWeight: "bold" }}>
                            Bạn cần đăng nhập, chọn sách và bấm nút "Mượn sách". Sau đó đến
                            thư viện và nhận sách.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Làm thế nào để thêm sách vào danh sách yêu thích?</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ fontWeight: "bold" }}>
                            Vào trang chi tiết của sách và bấm nút "Yêu thích". Sách sẽ được lưu trong mục
                            "Danh sách yêu thích" của bạn.
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Tôi có thể xem lịch sử mượn sách ở đâu?</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ fontWeight: "bold" }}>
                            Bạn có thể vào mục "Lịch sử mượn" trong tài khoản để xem danh sách các sách đã
                            mượn và trả.
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Nếu tôi làm mất sách thì phải xử lý thế nào?</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ fontWeight: "bold" }}>
                            Bạn cần liên hệ trực tiếp với thủ thư để bồi thường hoặc thay thế cuốn sách đã mất
                            theo quy định của thư viện.
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Tôi có thể cập nhật thông tin cá nhân không?</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ fontWeight: "bold" }}>
                            Có, bạn có thể vào phần "Cập nhật tài khoản" để thay đổi mật khẩu, email hoặc thông tin liên hệ của mình.
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Contact Form */}
            <Card sx={{ width: "100%", maxWidth: 800 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        📩 Liên hệ với chúng tôi
                    </Typography>
                    <Stack spacing={2}>
                        <TextField label="Tên của bạn" fullWidth />
                        <TextField label="Email của bạn" type="email" fullWidth />
                        <TextField
                            label="Vấn đề bạn gặp phải là gì?"
                            multiline
                            rows={4}
                            fullWidth
                        />
                        <Button variant="contained" fullWidth>
                            Gửi
                        </Button>
                    </Stack>
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
                                            msg.from === "user" ? "primary.light" : "grey.200",
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
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Nhập tin nhắn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                        >
                            Gửi
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default memo(SupportPage);
