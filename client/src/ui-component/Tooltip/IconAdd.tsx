import React from 'react';
import { Tooltip, Fab } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

interface Props {
    title: string;
    openInfoDialog: () => Promise<void>
}
const IconAdd: React.FC<Props> = ({ title, openInfoDialog }) => {
    return (
        <Tooltip title={title}>
            <Fab size="medium" color="primary" aria-label="add" sx={{ ml: 2, mb: -3 }} onClick={openInfoDialog}>
                <AddIcon />
            </Fab>
        </Tooltip>
    )
}

export default IconAdd