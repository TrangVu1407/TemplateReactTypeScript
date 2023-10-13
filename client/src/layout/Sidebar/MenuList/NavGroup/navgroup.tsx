import React from "react";
import { useTheme } from "@mui/material/styles";
import { NavLink, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Collapse } from "@mui/material";
import type { PropsMenuList } from "menu-items/index"

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Navgroup = (item: PropsMenuList) => {
    const theme = useTheme();
    let checkOpen = -1;
    const currentLocation = useLocation().pathname;
    for (let i = 0; i < item.items.itemGroup.length; i++) {
        for (let j = 0; j < item.items.itemGroup[i].itemGropss.length; j++) {
            if (item.items.itemGroup[i].itemGropss[j].path === currentLocation) {
                checkOpen = i
            }
        }
    }
    const [open, setOpen] = React.useState(checkOpen);
    React.useEffect(() => {
        setOpen(checkOpen)
    }, [checkOpen]);

    return (
        <Box>
            <List>
                {/* bắt đầu menu 2 cấp */}
                {item.items.itemGroup?.map((group, index) => (
                    <Box key={index}>
                        <ListItemButton
                            onClick={() => setOpen(open === index ? -1 : index)}
                        >
                            <ListItemIcon>
                                {group.icon}
                            </ListItemIcon>
                            <ListItemText primary={group.name} />
                            {open === index ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open === index} timeout="auto" unmountOnExit>
                            <List>
                                {group.itemGropss.map((item) => (
                                    <NavLink to={item.path} key={item.path} className={theme.palette.mode === 'dark' ? 'link_dark' : 'link_light'}>
                                        <ListItem key={item.path} disablePadding>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={item.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                ))}
            </List>
        </Box>
    )
}

export default Navgroup