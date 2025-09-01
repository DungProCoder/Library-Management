import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../servers/auth";

export const PrivateRoute = () => {
    const user = getUser();
    if (!user) {
        return <Navigate to="/dang-nhap" replace />;
    }

    return <Outlet />;
};

export const AdminRoute = () => {
    const user = getUser();
    if (!user) {
        return <Navigate to="/dang-nhap" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />;
};