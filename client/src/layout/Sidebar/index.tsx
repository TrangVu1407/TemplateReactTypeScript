import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import config from "../../config"
import { useTheme } from "@mui/material/styles";

import type { Props } from "../mainLayout"

import "../mainLayout.css"

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const SideBar: React.FC<Props> = ({ openSidebar, drawerToggle }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    sx={{
                        width: config.drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: config.drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    open={openSidebar}
                    onClose={drawerToggle}
                    variant={matchUpMd ? "persistent" : "temporary"}
                    anchor="left"
                >
                    <DrawerHeader style={{ background: "orange" }}></DrawerHeader>
                    {/* Dấu gạch ngang */}
                    <Divider />

                    <div id="style_overflow">
                        <List>
                            {['Send email', 'Drafts'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        {/* gạch ngang */}
                        <Divider />
                    </div>
                </Drawer>
            </Box>
        </>
    );
}

export default SideBar;



