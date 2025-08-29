import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./utils/router";
import MasterLayout from "./pages/client/theme/master";
import HomePage from "./pages/client/home";
import Category from "./pages/client/category";
import BookDetail from "./pages/client/detail";
import Cart from "./pages/client/cart";
import Checkout from "./pages/client/checkout";
import Login from "./pages/client/auth/login";
import Register from "./pages/client/auth/register";

import Profile from "./pages/client/profile";
import Info from "./pages/client/profile/info";
import Account from "./pages/client/profile/account";

import AdminLayout from "./pages/admin/theme/master";
import AdminDashboard from "./pages/admin/dashboard";

import BookList from "./pages/admin/book";
import BookAdd from "./pages/admin/book/create";
import BookEdit from "./pages/admin/book/edit";

import CategoryList from "./pages/admin/category";
import CategoryAdd from "./pages/admin/category/create";
import CategoryEdit from "./pages/admin/category/edit";

import BorrowRecordList from "./pages/admin/borrow";

import UserList from "./pages/admin/user";
import UserEdit from "./pages/admin/user/edit";

const renderUserRouter = () => {
    return (
        <Route path={ROUTER.USER.ROOT} element={<MasterLayout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTER.USER.CATEGORY} element={<Category />} />
            <Route path={ROUTER.USER.BOOK_DETAIL} element={<BookDetail />} />
            <Route path={ROUTER.USER.CART} element={<Cart />} />
            <Route path={ROUTER.USER.CHECKOUT} element={<Checkout />} />
            <Route path={ROUTER.USER.LOGIN} element={<Login />} />
            <Route path={ROUTER.USER.REGISTER} element={<Register />} />

            <Route path={ROUTER.USER.ACCOUNT} element={<Profile />}>
                <Route path="thong-tin-lien-he" element={<Info />} />
                <Route path="tai-khoan" element={<Account />} />
            </Route>
        </Route>
    );
}

const renderAdminRouter = () => {
    return (
        <Route path={ROUTER.ADMIN.ROOT} element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path={ROUTER.ADMIN.BOOKS} element={<BookList />} />
            <Route path={ROUTER.ADMIN.BOOK_ADD} element={<BookAdd />} />
            <Route path={ROUTER.ADMIN.BOOK_EDIT} element={<BookEdit />} />

            <Route path={ROUTER.ADMIN.CATEGORIES} element={<CategoryList />} />
            <Route path={ROUTER.ADMIN.CATEGORY_ADD} element={<CategoryAdd />} />
            <Route path={ROUTER.ADMIN.CATEGORY_EDIT} element={<CategoryEdit />} />

            <Route path={ROUTER.ADMIN.USERS} element={<UserList />} />
            <Route path={ROUTER.ADMIN.EDIT} element={<UserEdit />} />

            <Route path={ROUTER.ADMIN.BORROW} element={<BorrowRecordList />} />
        </Route>
    )
}


const renderCustom = () => {
    return (
        <Routes>
            {renderUserRouter()}
            {renderAdminRouter()}
        </Routes>
    );
};

export default renderCustom