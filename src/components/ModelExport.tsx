import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

interface TitleProps {
  children?: React.ReactNode;
}

export default function ModelExport(props: TitleProps) {
  return (
    <Paper sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: 4
    }}>
      <Grid item xs={12} md={12} container justifyContent="flex-end">
        <Button variant="text">Export</Button>
        <Button variant="contained">Export</Button>
      </Grid>
    </Paper>
  );
}