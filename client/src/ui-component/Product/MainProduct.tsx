import React from 'react'
import { Box, Typography, CardContent } from '@mui/material';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  sx: {
    background?: string;
    border?: number;
  };
}
const MainProduct: React.FC<Props> = ({ title, children, sx }) => {
  return (
    <Box sx={{ border: `${sx.border}px solid`, background: sx.background }}>

      <Box sx={{ p: 2, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', borderRadius: "10px" }}>
        <Typography variant="h5">
          {title}
        </Typography>
      </Box>


      {/* nội dung từ nơi khác */}
      <CardContent>{children}</CardContent>

    </Box>
  )
}

export default MainProduct