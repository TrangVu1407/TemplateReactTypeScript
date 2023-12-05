import ShoppingCart from "@mui/icons-material/ShoppingCart";
import TypeSpecimen from "@mui/icons-material/TypeSpecimen"
import CropRotate from "@mui/icons-material/CropRotate"
import PermDeviceInformation from "@mui/icons-material/PermDeviceInformation"
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

import type { PropsMenuItem } from "./index"

const Dashboard: PropsMenuItem = {
    nameGroup: "product",
    itemNav: [{
        path: "/product",
        name: "menu_product",
        icon: <ShoppingCart />
    }, {
        path: "/product_create",
        name: "menu_product_creater",
        icon: <CastForEducationIcon />
    },],
    itemGroup: [{
        name: "nav_product",
        icon: <PermDeviceInformation />,
        itemGropss: [
            {
                path: "/product_type",
                name: "product_type",
                icon: <TypeSpecimen />
            }, {
                path: "/demo",
                name: "demo",
                icon: <CropRotate />
            },
        ]
    },]
}

export default Dashboard;
