import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ModelInfo from './ModelInfo';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function ModelHeader(props: HeaderProps) {
  const [model, setModel] = useState({});

  useEffect(() => {
    props.modelsData.forEach((inModel) => {
      (inModel.id == props.modelId) ? setModel(inModel) : null;
  });
  }, []);

  return (
    <div>
      <Grid item xs={12} md={12} container>
        <Button onClick={props.clearModelId} variant="contained">Back to Models</Button>
        <ModelInfo modelName={model.name} modelDescription={model.description} />
      </Grid>
    </div>
  );
}