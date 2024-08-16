import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ModelForm from './ModelForm';
import ModelViewer from './ModelViewer';
import ModelHeader from './ModelHeader';
import ModelExport from './ModelExport';

const ModelConfig = (props) => {
  const [modelLink, setModelLink] = useState();

  return (
    <>
      <Grid item xs={12}>
        <ModelHeader modelData={props.model} clearModel={props.onClearModel} />
      </Grid>
      <Grid item xs={12} md={8} lg={4}>
        <ModelForm modelId={props.model.id} setModelLink={setModelLink} />
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <ModelViewer modelId={props.model.id} modelLink={modelLink} />
      </Grid>
      <Grid item xs={12}>
        <ModelExport modelId={props.model.id} modelLink={modelLink}/>
      </Grid>
    </>
  );
};

export default ModelConfig;