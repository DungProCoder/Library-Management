import { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: "24px" }}>
                <Outlet />
            </main>
        </div>
    );
};

export default memo(AdminLayout);