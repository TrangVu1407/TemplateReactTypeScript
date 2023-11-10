import HomeIcon from "@mui/icons-material/Home";

import type { PropsMenuItem } from "./index"

const Dashboard: PropsMenuItem = {
    nameGroup: "dashboard",
    itemNav: [{
        path: "/dashboard",
        name: "menu_home",
        icon: <HomeIcon />
    },],
    itemGroup: []
}

export default Dashboard;
