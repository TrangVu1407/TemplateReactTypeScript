import React from 'react'
import { Box } from "@mui/material";
import config from "../../../config"

const InfoSidebar = () => {
    return (
        <>
            <Box
                sx={{
                    height: config.heightHeader < 65 ? '64px' : `${config.heightHeader}px`,
                    background: "orange",
                    cursor: "pointer",
                }}
            >
                <h2 style={{ textAlign: "center", color: "white", marginTop: "16px" }}>
                    {config.name}
                </h2>
            </Box>
        </>
    )
}

export default InfoSidebar