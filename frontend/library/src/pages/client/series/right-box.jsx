import { memo } from 'react';
import {
    Box,
    Card,
    CardMedia,
} from "@mui/material";

const RightBox = () => {
    const posters = [
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
    ];

    return (
        <Box>
            {posters.map((img, index) => (
                <Card
                    key={index}
                    sx={{
                        borderRadius: 3,
                        boxShadow: 1,
                        overflow: "hidden",
                        width: "100%",
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": { boxShadow: 4 },
                    }}
                >
                    <CardMedia
                        component="img"
                        image={img}
                        alt={`Poster ${index + 1}`}
                        sx={{
                            width: "100%",
                            height: 400,
                            objectFit: "cover",
                        }}
                    />
                </Card>
            ))}
        </Box>
    );
};

export default memo(RightBox);