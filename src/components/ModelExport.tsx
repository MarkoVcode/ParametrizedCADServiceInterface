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

//https://medium.com/@yashkhant24/binary-file-downloads-in-javascript-react-ec6a355fcacc
//https://stackoverflow.com/questions/56219640/how-to-download-a-file-through-an-api-in-react

export default function ModelExport(props: TitleProps) {
  const config = useConfig();
  const shareLink = config.app.URL + "/models/" + props.modelId + "/" + props.modelLink;

  const handleDownload = async () => {
    try {
        fetch(config.app.CAD_SERVICE_URL + "/models/0000/cad?export=true", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "height": 60.0,
            "width": 80.0,
            "thickness": 10.0,
            "diameter": 90.0,
            "padding": 12.0
        }) 
        }).then(res => res.arrayBuffer())  //  fetch('https://fastly.picsum.photos/id/669/536/354.jpg?hmac=MwxCihHFk-YctYB8BovPqrGFY6EuCSFrWBC3jvgxyiw')
        .then(buffer => { 
          const blob = new Blob([buffer], {
            type: "application/zip",
          });
          console.log(blob);
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "export.zip";
          document.body.appendChild(a);
          a.click();
         })
       
    } catch (error) {
      alert("Something went wrongBBBBBBBBBBB");
    }
  };

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
        <Button variant="contained" onClick={handleDownload} >Export</Button>
      </Grid>
    </Paper>
  );
}