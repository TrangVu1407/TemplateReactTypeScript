import React from 'react'
import { Card, Typography, Divider, CardContent } from '@mui/material';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  sx: {
    color?: string;
    borderColor?: string;
    borderColorHr?: string;
  };
}
const SettingCard: React.FC<Props> = ({ title, children, sx }) => {
  return (
    <Card sx={{ border: '2px solid', borderColor: sx.borderColor }}>
      <Typography variant="h5">{title}</Typography>

      {/* dấu gạch ngang */}
      <Divider sx={{ opacity: 1, borderColor: sx.borderColorHr }} />

      {/* nội dung từ nơi khác */}
      <CardContent>{children}</CardContent>

    </Card>
  )
}

export default SettingCard