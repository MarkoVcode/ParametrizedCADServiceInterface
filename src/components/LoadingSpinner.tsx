import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const LoadingSpinner = () => {
    return (
        <Grid item xs={12}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
                <Typography variant="h6" mt={2}>
                    Loading, please wait...
                </Typography>
            </Box>
        </Grid>
    );
};

export default LoadingSpinner;