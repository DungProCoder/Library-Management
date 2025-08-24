import { memo } from 'react';
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    "/books": "Quản lý sách",
};

const BreadcrumbsComponent = ({ items }) => {
    const location = useLocation();
    let pathnames = location.pathname.split("/").filter((x) => x);

    // Bỏ "admin" nếu có trong URL
    if (pathnames[0] === "admin") {
        pathnames = pathnames.slice(1);
    }

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <Link component={RouterLink} to="/" underline="hover" color="inherit">
                <HomeIcon fontSize="small" />
            </Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                    <Typography key={to} color="text.primary">
                        {breadcrumbNameMap[to] || value}
                    </Typography>
                ) : (
                    <Link
                        key={to}
                        component={RouterLink}
                        to={to}
                        underline="hover"
                        color="inherit"
                    >
                        {breadcrumbNameMap[to] || value}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default memo(BreadcrumbsComponent);