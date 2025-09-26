import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../servers/auth";

export const PrivateRoute = () => {
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert("Vui lòng đăng nhập để truy cập!");
            navigate("/dang-nhap", { replace: true });
        }
    }, [user, navigate]);

    // Nếu chưa login thì không render gì cả (tránh render nhiều lần)
    if (!user) return null;

    return <Outlet />;
};

export const AdminRoute = () => {
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap", { replace: true });
            return;
        }

        if (user.role !== "admin") {
            navigate("/403", { replace: true });
        }
    }, [user, navigate]);

    if (!user || user.role !== "admin") return null;

    return <Outlet />;
};