import { memo } from 'react';
import BreadcrumbsComponent from '../components/breadcrumbs';

const Breadcrumb = () => {
    const breadcrumbItems = [
        { label: "Trang Chủ", href: "/" },
        { label: "Chi tiết sách", href: "/chi-tiet-sach" }
    ];

    return (
        <>
            {/* Breadcrumb */}
            <BreadcrumbsComponent items={breadcrumbItems} />
        </>
    );
};

export default memo(Breadcrumb);