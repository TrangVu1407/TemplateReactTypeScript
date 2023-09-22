import React from "react";
import { useTheme } from "@mui/material/styles";

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from '@mui/icons-material/Send';

import { NavLink } from 'react-router-dom';

import NavGroup from "./NavGroup/navgroup"

const MenuList = () => {
  const theme = useTheme();

  const menuItem = [
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
        name: "Vav2",
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
              path: "/demo2",
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
              path: "/demo2",
              name: "Group2.1",
              icon: <MailIcon />
            }, {
              path: "/demo2",
              name: "Group2.2",
              icon: <MailIcon />
            },
          ]
        },
      ]
    },
  ];
  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {menuItem.map((item) => (
          !item.itemGroup ? (
            <NavLink to={item.path} key={item.name} className={theme.palette.mode === 'dark' ? 'link_dark' : 'link_light'}>
              <ListItem key={item.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </NavLink>) :
            (
              // nếu là menu 2 cấp thì vào đây
              <NavGroup items={item} />
            )
        ))}
      </List>


    </Box>
  );
};

export default MenuList;
