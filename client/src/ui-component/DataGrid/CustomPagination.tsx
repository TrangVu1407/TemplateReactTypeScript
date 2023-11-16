import * as React from 'react';
import { useGridApiContext, useGridSelector, gridPageCountSelector, gridPageSelector } from '@mui/x-data-grid';
import { Pagination, PaginationItem } from '@mui/material';

const CustomPagination = (props: any) => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page + 1}
            siblingCount={0}
            count={pageCount}
            // @ts-expect-error
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                apiRef.current.setPage(value - 1)
            }
        />
    );
}

export default CustomPagination