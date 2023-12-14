import React from 'react'
import { Grid, Button, TextField } from '@mui/material';
import Image from './Detail/image'

const Create = () => {
  const initialImages: { featured: boolean; img: string; title: string }[] = [
    {
      featured: false,
      img: 'path_to_image',
      title: 'Image Title',
    },
  ];
  const [images, setImages] = React.useState(initialImages);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Image images={images} setImages={setImages} />
      </Grid>

      {/* Right Part */}
      <Grid item xs={8}>
        <Button variant="outlined">Bên phải</Button>
      </Grid>
    </Grid>
  )
}

export default Create