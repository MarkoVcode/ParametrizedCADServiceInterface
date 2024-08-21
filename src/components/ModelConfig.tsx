import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ModelForm from './ModelForm';
import ModelViewer from './ModelViewer';
import ModelHeader from './ModelHeader';
import ModelExport from './ModelExport';
import { useParams, useLocation } from 'react-router-dom';
import useConfig from "./useConfig";

const ModelConfig = (props) => {
  const [model, setModel] = useState();
  const [modelLink, setModelLink] = useState();
  const params = useParams();
  const config = useConfig();

  useEffect(() => {
    // MUST HANDLE 404 here to avoid errors with wrong model
    fetch(config.app.CAD_SERVICE_URL + "/models/" + params.modelId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setModel(data);
      });
    //console.log(location); /NjA7MzA7MTA7MjguNTsxMg==  /models/0000/params/MTguMDsxMC4wOzE4LjA7MjIuMDsxMi4w
  }, [])

  return (
    <Grid container spacing={3}>
      {model && <>
        <Grid item xs={12}>
          <ModelHeader modelData={model} />
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <ModelForm modelId={model.id} setModelLink={setModelLink} linkParams={params.modelLink} />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <ModelViewer modelId={model.id} modelLink={modelLink} />
        </Grid>
        <Grid item xs={12}>
          <ModelExport modelId={model.id} modelLink={modelLink} />
        </Grid>
      </>}
    </Grid>
  );
};

export default ModelConfig;