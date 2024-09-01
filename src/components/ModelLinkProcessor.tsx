import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PageNotFound from './PageNotFound';
import { useEffect, useRef, useState } from 'react';
import useConfig from './useConfig';
import { useNavigate, useParams } from 'react-router-dom';
import ModelIsLoading from './ModelIsLoading';

interface ProcProps {
  children?: React.ReactNode;
}

export default function ModelLinkProcessor(props: ProcProps) {
  const config = useConfig();
  const params = useParams();
  const navigate = useNavigate();
  const [pageNotFound, setPageNotFound] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchModelWithParams = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      try {
        const response = await fetch(config.app.CAD_SERVICE_URL + "/models/" + params.modelId + "/params/" + params.modelLink, {
          signal: abortControllerRef.current?.signal
        });
        if (response.status == 404 || response.status == 400) {
          setPageNotFound(true);
        } else if (response.status == 200) {
          const model = (await response.json());
          localStorage.setItem("/models/" + params.modelId, JSON.stringify(model));
          navigate("/models/" + params.modelId);
        } else {
          console.log("Something goes wrong!", response);
          alert("API is having some technical problems. Please come back later.");
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("API call was cancelled!");
        } else {
          console.error("The API service is not working!!", err.name);  // connection is dead service is not responding
          alert("It seems like there is no API connection or the service is down. Please try again later.");
        }
      } finally {
        console.log("it is done");
      }
    };

    fetchModelWithParams();
  }, []);

  return (
    <Grid container spacing={3}>
      {pageNotFound ? (
        <PageNotFound />
      ) : (
        <ModelIsLoading />
      )}
    </Grid>
  );
}