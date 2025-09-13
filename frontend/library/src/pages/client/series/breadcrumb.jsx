import { memo } from 'react';
import { Container } from "@mui/material";
import BreadcrumbsComponent from '../components/breadcrumbs';

const Breadcrumb = () => {
    const breadcrumbItems = [
        { label: "Trang Chủ", href: "/" },
        { label: `Sách tuyển tập`, href: `/tuyen-tap` }
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