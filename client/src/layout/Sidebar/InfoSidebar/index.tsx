import { Toolbar, Typography } from '@mui/material';

import config from "../../../config"

const Header: React.FC = () => {
    return (
        <Toolbar style={{ background: "orange" }}>
            <Typography
                variant="h3"
                noWrap
                sx={{ fontWeight: 600 }}
            >
                {config.name}
            </Typography>
        </Toolbar>
    );
}

export default Header;