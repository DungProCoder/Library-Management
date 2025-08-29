export const ROUTER = {
    USER: {
        HOME: '/',
        CATEGORY: '/the-loai',
        BOOK_DETAIL: '/chi-tiet-sach',
        CART: '/gio-hang',
        CHECKOUT: '/thanh-toan',
        LOGIN: '/dang-nhap',
        REGISTER: '/dang-ky',
        ACCOUNT: '/thong-tin-ca-nhan',
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
        CATEGORY_DETAIL: "categories/detail/:id",

        // Quản lý mượn trả
        BORROW: "borrow",

        // Quản lý người dùng
        USERS: "users",
        EDIT: "users/edit/:id",
    },
}