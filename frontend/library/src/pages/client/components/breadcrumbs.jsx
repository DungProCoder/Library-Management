import { memo } from 'react';
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbsComponent = ({items}) => {
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 2 }}
        >
            {items.map((item, index) =>
                index < items.length - 1 ? (
                    <Link
                        key={index}
                        component={RouterLink}
                        to={item.href}
                        underline="hover"
                        color="inherit"
                    >
                        {item.label}
                    </Link>
                ) : (
                    <Typography key={index} color="text.primary">
                        {item.label}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
};

export default memo(BreadcrumbsComponent);