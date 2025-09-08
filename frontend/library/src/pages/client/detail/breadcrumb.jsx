import { memo } from 'react';
import BreadcrumbsComponent from '../components/breadcrumbs';

const Breadcrumb = ({ book }) => {
    const breadcrumbItems = [
        { label: "Trang Chủ", href: "/" },
        { label: `Sách: ${book.title}`, href: `${book.isbn}` }
    ];

    return (
        <>
            {/* Breadcrumb */}
            <BreadcrumbsComponent items={breadcrumbItems} />
        </>
    );
};

export default memo(Breadcrumb);