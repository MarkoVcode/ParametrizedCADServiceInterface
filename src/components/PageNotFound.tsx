import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box } from '@mui/material';

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 6000)
  }, [])

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Box mb={2}>
            <Typography variant="h1" color="textPrimary" sx={{ fontSize: '10rem', fontWeight: 'bold' }}>
              404
            </Typography>
          </Box>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Sorry, page or model you are after is not here!
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            It seems we can't find what you're looking for. You might want to check the URL or return to the homepage.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Go to Homepage
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}