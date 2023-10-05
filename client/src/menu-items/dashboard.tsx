import HomeIcon from "@mui/icons-material/Home";

import type { PropsMenuItem } from "./index"

const Dashboard: PropsMenuItem = {
    nameGroup: "Dashboard",
    itemNav: [{
        path: "/dashboard",
        name: "Home",
        icon: <HomeIcon />
    },],
    itemGroup: []
}

export default Dashboard;
