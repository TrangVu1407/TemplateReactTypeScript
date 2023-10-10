import React from 'react'
import { Box, Typography, CardContent } from '@mui/material';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  sx: {
    background?: string;
  };
}
const MainProduct: React.FC<Props> = ({ title, children, sx }) => {
  return (
    <Box sx={{ border: '1px solid', background: sx.background }}>
      <Typography variant="h5">{title}</Typography>

      {/* nội dung từ nơi khác */}
      <CardContent>{children}</CardContent>

    </Box>
  )
}

export default MainProduct