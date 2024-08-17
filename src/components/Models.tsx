import * as React from 'react';
import { useState, useEffect, lazy, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import Grid from '@mui/material/Grid';
import { fetchModel } from "../tools/CadQueryAPI";
import useConfig from "./useConfig";
import { useParams } from 'react-router-dom';

const Models = (props) => {
  const config = useConfig();
  const params = useParams();
  const [model, setModel] = useState(null);

  const onClearModel = (event) => {
    setModel(null);
  }

  useEffect(()  => {
    console.log(params);
    // console.log("QQA:" + props.modelId + "-" + props.modelParams);
    // async function apiCall(config, modelId) {
    //   let model = await fetchModel(config, modelId);
    //   model = await model;
    //   console.log("model :" + model.id);
    //   setModel(model);
    // }
    // if(props.modelId != undefined ) {
    //   apiCall(config, props.modelId)
    // }
  }, [])

  const ModelConfig = lazy(() => import("./ModelConfig"));
  const ModelList = lazy(() => import("./ModelList"));
  
  return (
    <Grid container spacing={3}>
      {model ? (
        <Suspense fallback={<LoadingSpinner />}>
          <ModelConfig model={model} onClearModel={onClearModel} />
        </Suspense>
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <ModelList setModel={setModel} />
        </Suspense>
      )}
    </Grid>
  );
}

export default Models;