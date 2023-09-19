import MainLayout from "../layout/mainLayout"

import Home from "../views/pages/Home"

const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
    ],
}

export default MainRoutes;