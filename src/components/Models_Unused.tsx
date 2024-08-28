import * as React from 'react';
import { useState, useEffect, lazy, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import Grid from '@mui/material/Grid';
import { fetchModel } from "../tools/CadQueryAPI";
import useConfig from "./useConfig";
import { useParams, useLocation } from 'react-router-dom';

const Models = (props) => {
  //const config = useConfig();
 // const params = useParams();
 // const [models, setModels] = useState(null);
 // const location = useLocation();

  // const onClearModel = (event) => {
  //   setModel(null);
  // }

  useEffect(()  => {
    // console.log(params);
    // fetch(config.app.CAD_SERVICE_URL + '/models')
    // .then((res) => {
    //     return res.json();
    // })
    // .then((data) => {
    //     setModels(data);
    // });
   // console.log(location);
    //return <span>Path : {location.pathname}</span>
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

  //const ModelConfig = lazy(() => import("./ModelConfig"));
  const ModelList = lazy(() => import("./ModelList"));
  
  return (
    <Grid container spacing={3}>
        <Suspense fallback={<LoadingSpinner />}>
          <ModelList />
        </Suspense>
    </Grid>
  );
}

export default Models;