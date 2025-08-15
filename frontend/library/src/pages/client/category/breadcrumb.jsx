import { memo } from 'react';
import { Container } from "@mui/material";
import BreadcrumbsComponent from '../components/breadcrumbs';

const Breadcrumb = () => {
    const breadcrumbItems = [
        { label: "Trang Chủ", href: "/" },
        { label: "Thể Loại", href: "/the-loai" }
    ];

    return (
        <>
            {/* Breadcrumb */}
            <Container sx={{ pt: 2 }}>
                <BreadcrumbsComponent items={breadcrumbItems} />
            </Container>
        </>
    );
};

export default memo(Breadcrumb);