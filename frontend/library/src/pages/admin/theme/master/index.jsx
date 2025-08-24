import { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "./header";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ flexGrow: 1, paddingLeft: "20px", paddingRight: "20px" }}>
                <Header />
                <Outlet />
            </main>
        </div>
    );
};

export default memo(AdminLayout);