import { useTheme } from "@mui/material/styles";

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";

import { NavLink } from 'react-router-dom';

import NavGroup from "./NavGroup/navgroup"
import MenuList1 from "../../../menu-items"

const MenuList = () => {
  const theme = useTheme();

  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {MenuList1.items.map((item, index) => (
          !item.child ? (
            <NavLink to={item.path ? item.path : ''} key={item.path} className={theme.palette.mode === 'dark' ? 'link_dark' : 'link_light'}>
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
              <NavGroup items={item} key={index} />
            )
        ))}
      </List>


    </Box>
  );
};

export default MenuList;
