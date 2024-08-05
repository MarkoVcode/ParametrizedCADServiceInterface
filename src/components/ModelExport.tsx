import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

interface TitleProps {
  children?: React.ReactNode;
}

export default function ModelExport(props: TitleProps) {
  return (
    <div>
      <Grid item xs={12} md={12} container justifyContent="flex-end">
        <Button variant="text">Export</Button>
        <Button variant="contained">Export</Button>
      </Grid>
    </div>
  );
}