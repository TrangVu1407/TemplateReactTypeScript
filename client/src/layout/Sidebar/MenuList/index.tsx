import { useTheme } from "@mui/material/styles";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, ListSubheader } from "@mui/material";
import { NavLink } from 'react-router-dom';
import NavGroup from "./NavGroup/navgroup"
import MenuList1 from "menu-items"
import type { typeLocalStorage } from "local-storage/localStorage"

const MenuList = () => {
  const theme = useTheme();
  let listMenuItem = [];
  const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
  if (data.permissions) {
    for (let i = 0; i < MenuList1.items.length; i++) {
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
        listMenuItem.push({ nameGroup: MenuList1.items[i].nameGroup, itemNav: itemNav, itemGroup: itemGroup });
      }
    }
  }
  return (
    <Box sx={{ overflow: "auto" }}>
      {listMenuItem.map((item, index) => (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {item.nameGroup}
            </ListSubheader>
          }
          key={index}
        >
          {item.itemNav?.map((item, index) => (
            <NavLink to={item.path} key={index} className={theme.palette.mode === 'dark' ? 'link_dark' : 'link_light'}>
              <ListItem key={item.path} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}

          {/* bắt đầu menu 2 cấp */}
          <NavGroup items={item} key={index} />
          <Divider />
        </List>
      ))}

    </Box>
  );
};

export default MenuList;
