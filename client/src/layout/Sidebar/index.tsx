import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useMediaQuery } from '@mui/material';
import config from "config"
import { useTheme } from "@mui/material/styles";
import InfoSidebar from './InfoSidebar';
import MenuList from "./MenuList";

import type { Props } from "../mainLayout"

import "../mainLayout.sass"

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
                    <InfoSidebar />
                    <div id="style_overflow">
                        <MenuList />
                    </div>
                </Drawer>
            </Box>
        </>
    );
}

export default SideBar;



