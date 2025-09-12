import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { CategoryProvider } from "../../context/CategoryContext";
import { SearchProvider } from "../../context/SearchContext";

const MasterLayout = ({ children, ...props }) => {
    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <CategoryProvider>
                <SearchProvider>
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </SearchProvider>
            </CategoryProvider>
        </div>
    );
};

export default memo(MasterLayout);