import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import type { PropsMenuItem } from "./index"

const Demo: PropsMenuItem = {
    nameGroup: "Nested List Items",
    itemNav: [
        {
            path: "/demo1",
            name: "Inbox",
            icon: <InboxIcon />
        },
        {
            path: "/demo2",
            name: "Starred",
            icon: <MailIcon />
        },],
    itemGroup: [
        {
            name: "Group1",
            icon: <InboxIcon />,
            itemGropss: [
                {
                    path: "/demo4",
                    name: "Group1.1",
                    icon: <MailIcon />
                }, {
                    path: "/demo5",
                    name: "Group1.2",
                    icon: <MailIcon />
                },
            ]
        },
        {
            name: "Group2",
            icon: <InboxIcon />,
            itemGropss: [
                {
                    path: "/demo7",
                    name: "Group2.1",
                    icon: <MailIcon />
                }, {
                    path: "/demo8",
                    name: "Group2.2",
                    icon: <MailIcon />
                },
                {
                    path: "/demo9",
                    name: "Group2.3",
                    icon: <MailIcon />
                }, {
                    path: "/demo10",
                    name: "Group2.4",
                    icon: <MailIcon />
                },
            ]
        },
    ]
};

export default Demo;
