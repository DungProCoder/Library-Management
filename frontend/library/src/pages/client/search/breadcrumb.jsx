import { memo } from 'react';
import BreadcrumbsComponent from '../components/breadcrumbs';
import { useSearch } from '../context/SearchContext';

const Breadcrumb = () => {
    const { searchQuery } = useSearch();
    const breadcrumbItems = [
        { label: "Trang Chủ", href: "/" },
        { label: `Kết quả tìm kiếm cho: ${searchQuery}`, href: `/tim-kiem/?search=${searchQuery}` }
    ];

    return (
        <>
            {/* Breadcrumb */}
            <BreadcrumbsComponent items={breadcrumbItems} />
        </>
    );
};

export default memo(Breadcrumb);