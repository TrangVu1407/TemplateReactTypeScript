import MainLayout from "../layout/mainLayout"

import Home from "../views/pages/Home"

const MainRoutes = {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
        {
            path: "/dashboard",
            element: <Home />,
        },
    ],
}

export default MainRoutes;