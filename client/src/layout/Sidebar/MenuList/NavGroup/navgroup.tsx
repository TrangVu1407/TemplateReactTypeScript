import React from "react";

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, ListSubheader, Collapse } from "@mui/material";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export interface Props {
    items: {
        nameGroup?: string
        icon: JSX.Element;
        itemGroup: Array<ObjectGroup>;
        itemNav: Array<Object>;
    }
}

interface Object { name: string; path: string; icon: JSX.Element; }
interface ObjectGroup { name: string; path?: string; icon: JSX.Element; itemGropss: Array<Object> }

const Navgroup = (item: Props) => {
    const [open, setOpen] = React.useState(-1);
    return (
        <Box>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {item.items.nameGroup}
                    </ListSubheader>
                }
            >
                {item.items.itemNav.map((item) => (
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                ))}

                {/* bắt đầu menu 2 cấp */}
                {item.items.itemGroup.map((group, index) => (
                    <Box>
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
                                    <ListItem key={item.name} disablePadding>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.name} />
                                        </ListItemButton>
                                    </ListItem>
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