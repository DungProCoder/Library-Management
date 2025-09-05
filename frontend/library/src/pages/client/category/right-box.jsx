import { memo, useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import API from "../../../servers/api";
import { useCategory } from "../context/CategoryContext";

const LeftBox = () => {
    const [categories, setCategories] = useState([]);
    const { selectedCategory, setSelectedCategory } = useCategory();

    const fetchCategories = async () => {
        try {
            const response = await API.get("/client/categories/");
            setCategories(response.data.results);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            {/* RIGHT: Sidebar categories */}
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    position: { md: "sticky" },
                    top: { md: 16 },
                    border: "1px solid",
                    borderColor: "grey.200",
                }}
                elevation={0}
            >
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                    THỂ LOẠI
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <List disablePadding>
                    {categories.map((c) => {
                        const active = c.id === selectedCategory;
                        return (
                            <ListItemButton
                                key={c.id}
                                selected={active}
                                onClick={() => {
                                    setSelectedCategory(c.id);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    mb: 0.5,
                                    bgcolor: active ? "grey.100" : "transparent",
                                    "&:hover": { bgcolor: "grey.100" },
                                }}
                            >
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: active ? 600 : 400,
                                        lineHeight: 1.3,
                                    }}
                                    primary={c.name}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Paper>
        </>
    );
}

export default memo(LeftBox);