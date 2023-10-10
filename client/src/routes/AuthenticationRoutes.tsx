// import MainLayout from "../layout/mainLayout"

import Login from "views/login"

const MainRoutes = {
    path: "/",
    // kế thừa ở màn hình nào??
    // element: <MainLayout />,
    children: [
        {
            path: "/login",
            element: <Login />,
        },
    ],
}

export default MainRoutes;