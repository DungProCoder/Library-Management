import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./utils/router";
import MasterLayout from "./pages/client/theme/master";
import HomePage from "./pages/client/home";
import Category from "./pages/client/category";

const renderUserRouter = () => {
    const userRouter = [
        {
            path: ROUTER.USER.HOME,
            element: <HomePage />,
        },
        {
            path: ROUTER.USER.CATEGORY,
            element: <Category />,
        },
    ]

    return (
        <MasterLayout>
            <Routes>
                {userRouter.map((item, index) => (
                    <Route key={index} path={item.path} element={item.element}>
                        {item.children &&
                            item.children.map((child, childIndex) => (
                                <Route
                                    key={childIndex}
                                    path={child.path}
                                    element={child.element}
                                />
                            ))}
                    </Route>
                ))}
            </Routes>
        </MasterLayout>
    )
}

const renderCustom = () => {
    return renderUserRouter()
}

export default renderCustom