import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header"
import Sidebar from "./Sidebar"
import { styled } from '@mui/material/styles';
import "./mainLayout.css"
import config from "../config"
export interface Props {
    handleDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openSidebar: boolean;
    drawerToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    background: 'red',
    height: "100%",
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),

    [theme.breakpoints.up("md")]: {
        marginLeft: open ? config.drawerWidth : "none",
    },
    [theme.breakpoints.down("md")]: {
        padding: "10px",
    },
    [theme.breakpoints.down("sm")]: {
        padding: "10px",
    },
}));

const MainLayout = () => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(true);
    const handleDrawerOpen = () => {
        setOpenSidebar(!openSidebar)
    };

    const drawerToggle = () => {
        setOpenSidebar(false)
    }

    return (
        <>
            {/* Container nằm ở đây, vì layout chia làm 2 phần. 
                --- cấu hình layout:
                    Sidebar | Appbar: {header + container}     
            */}
            <Box>
                <CssBaseline />
                <AppBar sx={{ height: "100%" }}>
                    {/* header */}
                    <Toolbar>
                        <Header openSidebar={openSidebar} handleDrawerOpen={handleDrawerOpen} drawerToggle={drawerToggle} />
                    </Toolbar>
                    {/* container */}
                    <Main open={openSidebar} id="style_overflow">
                        <Outlet />
                    </Main>
                </AppBar>
                {/* sidebar */}
                <Sidebar openSidebar={openSidebar} handleDrawerOpen={handleDrawerOpen} drawerToggle={drawerToggle} />
            </Box>
        </>
    )
}

export default MainLayout