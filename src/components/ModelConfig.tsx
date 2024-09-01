import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import ModelForm from './ModelForm';
import ModelViewer from './ModelViewer';
import ModelHeader from './ModelHeader';
import ModelExport from './ModelExport';
import { useParams, useLocation } from 'react-router-dom';
import useConfig from "./useConfig";
import PageNotFound from './PageNotFound';

const ModelConfig = (props) => {
  const [model, setModel] = useState();
  const [modelLink, setModelLink] = useState();
  const [modelParams, setModelParams] = useState();
  const [pageNotFound, setPageNotFound] = useState(false);
  const params = useParams();
  const config = useConfig();

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchModel = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      try {
        const response = await fetch(config.app.CAD_SERVICE_URL + "/models/" + params.modelId, {
          signal: abortControllerRef.current?.signal
        });
        if (response.status == 404) {
          setPageNotFound(true);
        } else if (response.status == 200) {
          const model = (await response.json());
          setModel(model);
        } else {
          console.log("Something goes wrong!", response);
          alert("API is having some technical problems. Please come back later.");
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.info("API call was cancelled!");
        } else {
          console.error("The API service is not working!!", err);  // connection is dead service is not responding
          alert("It seems like there is no API connection or the service is down. Please try again later.");
        }
      } finally {
        //console.log("it is done");
      }
    };

    fetchModel();
  }, []);

  return (
    <Grid container spacing={3}>
      {pageNotFound ? (
        <PageNotFound />
      ) : (
        <>
          {model &&
            <>
              <Grid item xs={12}>
                <ModelHeader modelData={model} />
              </Grid>
              <Grid item xs={12} md={8} lg={4}>
                <ModelForm modelId={model.id} setModelLink={setModelLink} linkParams={params.modelLink} setModelParams={setModelParams} />
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <ModelViewer modelId={model.id} modelLink={modelLink} />
              </Grid>
              <Grid item xs={12}>
                <ModelExport modelId={model.id} modelLink={modelLink} modelParams={modelParams} />
              </Grid>
            </>
          }
        </>
      )}
    </Grid>
  );
};

export default ModelConfig;