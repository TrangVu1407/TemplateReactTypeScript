import MainLayout from "layout/mainLayout"

import Home from "views/pages/Home"
// product
import Product from "views/pages/Product"
import ProductType from "views/pages/Product/ProductType"
import ProductSize from "views/pages/Product/ProductSize"

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
            path: "/product_type",
            element: <ProductType />,
        },
        {
            path: "/product_size",
            element: <ProductSize />,
        },
        {
            path: "/demo",
            element: <ProductSize />,
        }
    ],
}

export default MainRoutes;