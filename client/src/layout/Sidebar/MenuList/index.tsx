import { useTheme } from "@mui/material/styles";

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";

import { NavLink } from 'react-router-dom';

import NavGroup from "./NavGroup/navgroup"
import MenuList1 from "../../../menu-items"
import type { typeLocalStorage } from "../../../local-storage/localStorage"

const MenuList = () => {
  const theme = useTheme();
  let listMenuItem = [];
  const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");

  for (let i = 0; i < MenuList1.items.length; i++) {
    if (MenuList1.items[i].child === false) {
      for (let j = 0; j < data.permissions.length; j++) {
        if (MenuList1.items[i].path === data.permissions[j].screen) {
          listMenuItem.push(MenuList1.items[i]);
        }
      }
    } else if (MenuList1.items[i].child === true) {
      let itemNav = [];
      let itemGroup = [];

      // navItem
      let dataNav = MenuList1.items[i].itemNav ? MenuList1.items[i].itemNav : [];
      if (dataNav !== undefined) {
        for (let k = 0; k < dataNav.length; k++) {
          for (let j = 0; j < data.permissions.length; j++) {
            if (data.permissions[j].screen === dataNav[k].path) {
              itemNav.push(dataNav[k]);
            }
          }
        }
      }

      // itemGroup
      let dataGroup = MenuList1.items[i].itemGroup ? MenuList1.items[i].itemGroup : [];
      if (dataGroup !== undefined) {
        for (let k = 0; k < dataGroup.length; k++) {
          let itemNav = [];
          let dataGroups = dataGroup[k].itemGropss ? dataGroup[k].itemGropss : [];
          for (let m = 0; m < dataGroups.length; m++) {
            for (let j = 0; j < data.permissions.length; j++) {
              if (data.permissions[j].screen === dataGroup[k].itemGropss[m].path) {
                itemNav.push(dataGroup[k].itemGropss[m]);
              }
            }
          }
          if (itemNav.length > 0) {
            itemGroup.push({ name: dataGroup[k].name, icon: dataGroup[k].icon, itemGropss: itemNav })
          }
        }
      }

      // else
      if (itemNav.length > 0 || itemGroup.length > 0) {
        listMenuItem.push({ path: '', name: '', nameGroup: MenuList1.items[i].nameGroup, icon: MenuList1.items[i].icon, child: MenuList1.items[i].child, itemNav: itemNav, itemGroup: itemGroup });
      }
    }
  }

  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {listMenuItem.map((item, index) => (
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
