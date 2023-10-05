import { Toolbar, Typography } from '@mui/material';

import config from "../../../config"
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    let navigate = useNavigate();

    const pageHome = () => {
        navigate("/dashboard");
    };
    return (
        <Toolbar style={{ background: "orange", cursor: "pointer" }} onClick={pageHome}>
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