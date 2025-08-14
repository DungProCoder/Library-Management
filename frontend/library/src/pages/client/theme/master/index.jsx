import { memo } from "react";
import Header from "../header";
import Footer from "../footer";

const MasterLayout = ({ children, ...props }) => {
    return (
        <div {...props} style={{ backgroundColor: "#f0f0f0" }}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default memo(MasterLayout);