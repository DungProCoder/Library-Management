import { Autocomplete, TextField, Chip } from "@mui/material";

export default function KeywordInput({ value, onChange }) {
    return (
        <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                        <Chip variant="outlined" key={key} label={option} {...tagProps} />
                    );
                })
            }
            renderInput={(params) => (
                <TextField sx={{ mt: 2 }} {...params} variant="outlined" label="Từ khóa" />
            )}
        />
    );
}
