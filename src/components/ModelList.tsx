import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ModelConfig from './ModelConfig';
import ModelViewer from './ModelViewer';
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
  const [isOpen, setIsOpen] = useState(false);
  const [modelId, setModelId] = useState();
  const [modelLink, setModelLink] = useState();

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  useEffect(() => {
    fetch(config.app.CAD_SERVICE_URL + '/models')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setModels(data);
      });
  }, []);

  return (
    <>
      {models.map((model) => (
        <Grid item xs={12} md={8} lg={4} key={model.id}> 
            <Card variant="outlined" 
            onClick={() => {
              setModelId(model.id);
              setModelLink(model.defaultPreviewValues);
              setIsOpen(true);
            }}
            sx={{ 
              maxWidth: 360,
              height: 200,
            }}
            >
            <Box sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography gutterBottom variant="h6" component="div">
                  {model.name}
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {model.description}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2">
                Labels
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="primary" label="Soft" size="small" />
                <Chip label="Medium" size="small" />
                <Chip label="Hard" size="small" />
              </Stack>
            </Box>
          </Card>
          </Grid>
      ))}
      {modelId &&
        <>
          <Grid item xs={12} md={8} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ModelConfig modelId={modelId} setModelLink={setModelLink} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ModelViewer modelId={modelId} modelLink={modelLink} />
            </Paper>
          </Grid>
        </>
      }
    </>
  );
};

export default ModelList;
