import ShoppingCart from "@mui/icons-material/ShoppingCart";
import TypeSpecimen from "@mui/icons-material/TypeSpecimen"
import CropRotate from "@mui/icons-material/CropRotate"
import PermDeviceInformation from "@mui/icons-material/PermDeviceInformation"

import type { PropsMenuItem } from "./index"

const Dashboard: PropsMenuItem = {
    nameGroup: "Product",
    itemNav: [{
        path: "/product",
        name: "Sản phẩm",
        icon: <ShoppingCart />
    },],
    itemGroup: [{
        name: "Information",
        icon: <PermDeviceInformation />,
        itemGropss: [
            {
                path: "/product_type",
                name: "Loại sản phẩm",
                icon: <TypeSpecimen />
            }, {
                path: "/product_size",
                name: "Kích thước",
                icon: <CropRotate />
            },
        ]
    },]
}

export default Dashboard;
