import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';

export default function ModelIsLoading() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Box mb={2}>
            <LoadingSpinner />
          </Box>
          <Typography variant="body1" color="textSecondary" paragraph>
            Your model is getting prepared
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}