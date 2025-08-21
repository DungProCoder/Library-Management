import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

const MasterLayout = ({ children, ...props }) => {
    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default memo(MasterLayout);