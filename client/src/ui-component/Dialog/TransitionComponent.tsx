import * as React from 'react';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

// from hiện từ dưới đi lên
const TransitionComponent = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default TransitionComponent