import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ModelConfig from './ModelConfig';
import ModelForm from './ModelForm';
import ModelViewer from './ModelViewer';
import ModelExport from './ModelExport';
import ModelHeader from './ModelHeader';
import ModelInfo from './ModelInfo';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useConfig from "./useConfig";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ModelList = () => {
  const config = useConfig();
  const [models, setModels] = useState([]);
  const [modelId, setModelId] = useState();
  const [modelLink, setModelLink] = useState();

  useEffect(() => {
    fetch(config.app.CAD_SERVICE_URL + '/models')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setModels(data);
      });
  }, []);

  const onClearModelId = (event) => {
    setModelId(null);
  }

  return (
    <>
      {modelId ? (
        <>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',       borderRadius: 2,
      boxShadow: 4 }}>
              <ModelHeader modelsData={models} modelId={modelId} clearModelId={onClearModelId} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',       borderRadius: 2,
      boxShadow: 4 }}>
              <ModelConfig modelId={modelId} setModelLink={setModelLink} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',      borderRadius: 2,
      boxShadow: 4 }}>
              <ModelViewer modelId={modelId} modelLink={modelLink} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ModelExport />
          </Grid>
        </>
      ) : (
        <>
          {models.map((model) => (
            <Grid item xs={12} md={8} lg={4} key={model.id}>
              <Card variant="outlined"
                onClick={() => {
                  setModelId(model.id);
                  setModelLink(model.defaultPreviewValues);
                }}
                sx={{
                  maxWidth: 360,
                  height: 200,
                  borderRadius: 2,
                  boxShadow: 4,
                }}
              >
                <ModelInfo modelName={model.name} modelDescription={model.description} />
              </Card>
            </Grid>
          ))}
        </>
      )}
    </>
  );
}

export default ModelList;