import { memo } from 'react';
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    "/books": { label: "Quản lý sách" },
    "/books/create": { label: "Thêm sách" },
    "/books/edit": { label: "Chỉnh sửa" },
    "/categories": { label: "Quản lý danh mục" },
    "/categories/create": { label: "Thêm danh mục" },
    "/categories/edit": { label: "Chỉnh sửa" },
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

                const item = breadcrumbNameMap[to];

                return isLast ? (
                    <Typography key={to} color="text.primary">
                        {item?.label || value}
                    </Typography>
                ) : (
                    <Link
                        key={to}
                        component={RouterLink}
                        to={'/admin' + to}
                        underline="hover"
                        color="inherit"
                    >
                        {item?.label || value}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default memo(BreadcrumbsComponent);