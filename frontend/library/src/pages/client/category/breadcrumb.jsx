import { memo } from 'react';
import { Container } from "@mui/material";
import { useSearchParams } from 'react-router-dom';
import BreadcrumbsComponent from '../components/breadcrumbs';

const Breadcrumb = () => {
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get('');

    const formatCategoryName = (slug) => {
        return slug
            ?.replace(/-/g, " ") // thay dấu - bằng space
            ?.replace(/\b\w/g, (char) => char.toUpperCase()); // viết hoa chữ đầu
    }

    const breadcrumbItems = [
        { label: "Trang Chủ", href: "/" },
        { label: "Thể Loại", href: "/the-loai" }
    ];

    if (categorySlug) {
        breadcrumbItems.push({
            label: formatCategoryName(categorySlug),
            href: `/the-loai/?=${categorySlug}`,
        });
    }

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