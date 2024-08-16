import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ModelInfo from './ModelInfo';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function ModelHeader(props: HeaderProps) {

  return (
    <Paper sx={{
      p: 2, display: 'flex', flexDirection: 'column', borderRadius: 2,
      boxShadow: 4
    }}>
      <Grid item xs={12} md={12} container>
        <Button onClick={props.clearModel} variant="contained">Back to Models</Button>
        <ModelInfo modelName={props.modelData.name} modelDescription={props.modelData.description} />
      </Grid>
    </Paper>
  );
}