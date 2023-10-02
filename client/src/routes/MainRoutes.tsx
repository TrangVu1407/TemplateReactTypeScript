import MainLayout from "../layout/mainLayout"

import Home from "../views/pages/Home"
import Demo1 from "../views/pages/Demo1/demo1";
import Demo2 from "../views/pages/Demo2/demo2";
import Demo3 from "../views/pages/Demo3/demo3";

const MainRoutes = {
    // notes: nếu đướng dẫn để trống thì phải return về nên giao diện đăng nhập. tìm cách nâng cấp ở đây sau??
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/dashboard",
            element: <Home />,
        },
        {
            path: "/demo1",
            element: <Demo1 />,
        },
        {
            path: "/demo2",
            element: <Demo2 />,
        },
        {
            path: "/demo3",
            element: <Demo3 />,
        },
        {
            path: "/demo4",
            element: <Demo1 />,
        },
        {
            path: "/demo5",
            element: <Demo2 />,
        },
        {
            path: "/demo6",
            element: <Demo3 />,
        },
        {
            path: "/demo7",
            element: <Demo1 />,
        },
        {
            path: "/demo8",
            element: <Demo2 />,
        },
        {
            path: "/demo9",
            element: <Demo3 />,
        },
        {
            path: "/demo10",
            element: <Demo3 />,
        },
    ],
}

export default MainRoutes;