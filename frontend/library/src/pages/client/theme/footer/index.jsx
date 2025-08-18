import { memo } from "react";
import {
    Box,
    Container
} from "@mui/material";
import Copyright from "./copyright";
import Information from "./information";

const Footer = () => {
    return (
        <Box sx={{ bgcolor: "#cccccc", py: 5, mt: 4 }}>
            <Container>
                <Information />
                <Copyright />
            </Container>
        </Box>
    );
};

export default memo(Footer);