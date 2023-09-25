import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from '@mui/icons-material/Send';

const Demo = [
    {
        path: "/demo1",
        name: "Inbox",
        icon: <InboxIcon />
    },
    {
        path: "/demo2",
        name: "Starred",
        icon: <MailIcon />
    },
    {
        nameGroup: "Nested List Items",
        icon: <SendIcon />,
        itemNav: [{
            path: "/demo1",
            name: "Nav1",
            icon: <InboxIcon />
        },
        {
            path: "/demo2",
            name: "Nav2",
            icon: <MailIcon />
        },],
        itemGroup: [
            {
                name: "Group1",
                icon: <InboxIcon />,
                itemGropss: [
                    {
                        path: "/demo2",
                        name: "Group1.1",
                        icon: <MailIcon />
                    }, {
                        path: "/demo1",
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
                        path: "/demo1",
                        name: "Group2.1",
                        icon: <MailIcon />
                    }, {
                        path: "/demo2",
                        name: "Group2.2",
                        icon: <MailIcon />
                    },
                    {
                        path: "/demo1",
                        name: "Group2.3",
                        icon: <MailIcon />
                    }, {
                        path: "/demo2",
                        name: "Group2.4",
                        icon: <MailIcon />
                    },
                ]
            },
        ]
    },
];

export default Demo;
