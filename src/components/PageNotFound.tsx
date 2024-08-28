import * as React from 'react';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000)
  }, [])

  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Page Not Found
    </Typography>
  );
}