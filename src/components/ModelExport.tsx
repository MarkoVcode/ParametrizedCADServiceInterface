import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Link, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography';
import useConfig from "./useConfig";

interface TitleProps {
  children?: React.ReactNode;
}

//https://stackoverflow.com/questions/56219640/how-to-download-a-file-through-an-api-in-react

export default function ModelExport(props: TitleProps) {
  const config = useConfig();
  const shareLink = config.app.URL + "/models/" + props.modelId + "/" + props.modelLink;

  return (
    <Paper sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: 4
    }}>
      <Link sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <IconButton color="primary">
          <ShareIcon />
        </IconButton>
        <Typography variant="caption" display="inline" gutterBottom sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
    }}>
          {shareLink}
        </Typography>
      </Link>
      <Grid item xs={12} md={12} container justifyContent="flex-end">
        <Button variant="contained">Export</Button>
      </Grid>
    </Paper>
  );
}