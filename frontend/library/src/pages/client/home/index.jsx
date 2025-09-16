import { memo, useEffect } from "react";
import {
    Container,
    Box
} from "@mui/material";
import Banner from "./banner";
import Sidebar from "./sidebar";
import Books from "./book";

const HomePage = () => {
    useEffect(() => {
        document.title = "Library - Trang chủ";
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <Banner />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Sidebar />
                    <Books />
                </Box>
            </Container>
        </>
    );
};

export default memo(HomePage);