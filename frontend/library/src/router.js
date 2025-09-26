import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./utils/router";

// Guards
import { PrivateRoute, AdminRoute } from "./utils/guards";

// Pages
import MasterLayout from "./pages/client/theme/master";
import HomePage from "./pages/client/home";
import Category from "./pages/client/category";
import Search from "./pages/client/search";
import Series from "./pages/client/series";
import BookDetail from "./pages/client/detail";
import Cart from "./pages/client/cart";
import Checkout from "./pages/client/checkout";
import Login from "./pages/client/auth/login";
import Register from "./pages/client/auth/register";

import Profile from "./pages/client/profile";
import Info from "./pages/client/profile/info";
import BorrowedList from "./pages/client/profile/borrowed";
import Account from "./pages/client/profile/account";
import FavoritesPage from "./pages/client/profile/favorite";

// Admin
import AdminLayout from "./pages/admin/theme/master";
import AdminDashboard from "./pages/admin/dashboard";

import BookList from "./pages/admin/book";
import BookAdd from "./pages/admin/book/create";
import BookEdit from "./pages/admin/book/edit";

import CategoryList from "./pages/admin/category";
import CategoryAdd from "./pages/admin/category/create";
import CategoryEdit from "./pages/admin/category/edit";

import SeriesPage from "./pages/admin/series";
import SeriesAdd from "./pages/admin/series/create";
import SeriesEdit from "./pages/admin/series/edit";

import BorrowRecordList from "./pages/admin/borrow";

import UserList from "./pages/admin/user";
import UserEdit from "./pages/admin/user/edit";

import FAQPage from "./pages/admin/faq";
import FAQAdd from "./pages/admin/faq/create";
import FAQEdit from "./pages/admin/faq/edit";

// Common pages
import Forbidden from "./pages/client/errors/forbidden";
import SupportPage from "./pages/client/support";

const renderUserRouter = () => {
    return (
        <Route path={ROUTER.USER.ROOT} element={<MasterLayout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTER.USER.CATEGORY} element={<Category />} />
            <Route path={ROUTER.USER.SEARCH} element={<Search />} />
            <Route path={ROUTER.USER.SERIES} element={<Series />} />
            <Route path={ROUTER.USER.BOOK_DETAIL} element={<BookDetail />} />
            <Route path={ROUTER.USER.LOGIN} element={<Login />} />
            <Route path={ROUTER.USER.REGISTER} element={<Register />} />

            {/* Private user */}
            <Route element={<PrivateRoute />}>
                <Route path={ROUTER.USER.CART} element={<Cart />} />
                <Route path={ROUTER.USER.CHECKOUT} element={<Checkout />} />
                <Route path={ROUTER.USER.ACCOUNT} element={<Profile />}>
                    <Route path="thong-tin-lien-he" element={<Info />} />
                    <Route path="sach-da-muon" element={<BorrowedList />} />
                    <Route path="tai-khoan" element={<Account />} />
                    <Route path="sach-yeu-thich" element={<FavoritesPage />} />
                </Route>
            </Route>

            {/* Common */}
            <Route path={ROUTER.USER.FORBIDDEN} element={<Forbidden />} />
            <Route path={ROUTER.USER.SUPPORT} element={<SupportPage />} />
        </Route>
    );
}

const renderAdminRouter = () => {
    return (
        <Route element={<AdminRoute />}>
            <Route path={ROUTER.ADMIN.ROOT} element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path={ROUTER.ADMIN.BOOKS} element={<BookList />} />
                <Route path={ROUTER.ADMIN.BOOK_ADD} element={<BookAdd />} />
                <Route path={ROUTER.ADMIN.BOOK_EDIT} element={<BookEdit />} />

                <Route path={ROUTER.ADMIN.CATEGORIES} element={<CategoryList />} />
                <Route path={ROUTER.ADMIN.CATEGORY_ADD} element={<CategoryAdd />} />
                <Route path={ROUTER.ADMIN.CATEGORY_EDIT} element={<CategoryEdit />} />

                <Route path={ROUTER.ADMIN.SERIES} element={<SeriesPage />} />
                <Route path={ROUTER.ADMIN.SERIES_ADD} element={<SeriesAdd />} />
                <Route path={ROUTER.ADMIN.SERIES_EDIT} element={<SeriesEdit />} />

                <Route path={ROUTER.ADMIN.USERS} element={<UserList />} />
                <Route path={ROUTER.ADMIN.EDIT} element={<UserEdit />} />

                <Route path={ROUTER.ADMIN.BORROW} element={<BorrowRecordList />} />

                <Route path={ROUTER.ADMIN.FAQ} element={<FAQPage />} />
                <Route path={ROUTER.ADMIN.FAQ_ADD} element={<FAQAdd />} />
                <Route path={ROUTER.ADMIN.FAQ_EDIT} element={<FAQEdit />} />
            </Route>
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