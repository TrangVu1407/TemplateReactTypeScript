import MainLayout from "layout/mainLayout"

import Home from "views/pages/Home"
// product
import Product from "views/pages/Product"
import ProductCreate from "views/pages/Product/create"
import ProductType from "views/pages/Product/ProductType"
import Demo from "views/pages/Product/demo"

const MainRoutes = {
    // notes: nếu đướng dẫn để trống thì phải return về nên giao diện đăng nhập. tìm cách nâng cấp ở đây sau?? ==> đã fix 
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
        //sản phẩm
        {
            path: "/product",
            element: <Product />,
        },
        {
            path: "/product_create",
            element: <ProductCreate />,
        },
        {
            path: "/product_type",
            element: <ProductType />,
        },
        {
            path: "/demo",
            element: <Demo />,
        }
    ],
}

export default MainRoutes;