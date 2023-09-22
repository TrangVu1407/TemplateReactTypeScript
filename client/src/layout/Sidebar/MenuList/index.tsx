import React from "react";
import { useTheme } from "@mui/material/styles";

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, ListSubheader, Collapse } from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { NavLink } from 'react-router-dom';

const MenuList = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
      path: "/demo3",
      name: "Send email",
      icon: <SendIcon />
    },
  ];
  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {menuItem.map((item) => (
          <NavLink to={item.path} key={item.name} className={theme.palette.mode === 'dark' ? 'link_dark' : 'link_light'}>
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>



      {/* menu list 2 cấp */}
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default MenuList;
