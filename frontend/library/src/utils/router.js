export const ROUTER = {
    USER: {
        HOME: '/',
        CATEGORY: '/the-loai',
        SEARCH: '/tim-kiem',
        SERIES: '/tuyen-tap',
        BOOK_DETAIL: '/:isbn',
        CART: '/dang-ky-muon-sach',
        CHECKOUT: '/tien-hanh-muon-sach',
        LOGIN: '/dang-nhap',
        REGISTER: '/dang-ky',
        ACCOUNT: '/thong-tin-ca-nhan',
        FORBBIDDEN: '/403',
        SUPPORT: '/ho-tro',
    },
    ADMIN: {
        ROOT: "/admin",
        DASHBOARD: "dashboard",

        // Quản lý sách
        BOOKS: "books",
        BOOK_ADD: "books/create",
        BOOK_EDIT: "books/edit/:id",
        BOOK_DETAIL: "books/detail/:id",

        // Quản lý thể loại
        CATEGORIES: "categories",
        CATEGORY_ADD: "categories/create",
        CATEGORY_EDIT: "categories/edit/:id",

        // Quản lý tuyển tập
        SERIES: "series",
        SERIES_ADD: "series/create",
        SERIES_EDIT: "series/edit/:id",
        SERIES_DETAIL: "series/detail/:id",

        // Quản lý mượn trả
        BORROW: "borrow",

        // Quản lý người dùng
        USERS: "users",
        EDIT: "users/edit/:id",

        // Quản lý FAQ
        FAQ: "faqs",
        FAQ_ADD: "faqs/create",
        FAQ_EDIT: "faqs/edit/:id",
    },
}