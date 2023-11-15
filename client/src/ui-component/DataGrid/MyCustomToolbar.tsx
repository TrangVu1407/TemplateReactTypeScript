import React from 'react'
import { Portal } from '@mui/base/Portal';
import { GridToolbarQuickFilter, GridToolbar } from '@mui/x-data-grid';

const MyCustomToolbar = (props: any) => {
    return (
        <React.Fragment>
            <Portal container={() => document.getElementById('filter-panel')}>
                <GridToolbarQuickFilter />
            </Portal>
            <GridToolbar {...props} />
        </React.Fragment>
    );
}

export default MyCustomToolbar