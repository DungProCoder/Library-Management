import { memo } from "react";
import { CssBaseline } from "@mui/material";
import HeaderTop from "./header-top";
import Menu from "./menu";

const Header = () => {
    return (
        <>
            <CssBaseline />
            <HeaderTop />
            <Menu />
        </>
    );
};

export default memo(Header);