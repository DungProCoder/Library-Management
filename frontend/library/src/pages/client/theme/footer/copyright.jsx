import { memo } from "react";
import {
    Box,
    Typography
} from "@mui/material";

const Copyright = () => {
    return (
        <>
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="body2">
                    © 2025 Library Management. All rights reserved.
                </Typography>
            </Box>
        </>
    )
}

export default memo(Copyright);