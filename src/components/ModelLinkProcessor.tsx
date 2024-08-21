import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import useConfig from './useConfig';
import { useNavigate, useParams } from 'react-router-dom';

interface ProcProps {
  children?: React.ReactNode;
}

export default function ModelLinkProcessor(props: ProcProps) {
  const config = useConfig();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(config.app.CAD_SERVICE_URL + "/models/" + params.modelId + "/params/" + params.modelLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("/models/" + params.modelId, JSON.stringify(data));
        navigate("/models/" + params.modelId);
      });
  }, [])

  return (
    <Typography color="text.secondary" variant="body2">
      Model Share share link here ????
    </Typography>
  );
}