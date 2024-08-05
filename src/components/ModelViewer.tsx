import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { StlViewer } from "react-stl-file-viewer";
import useConfig from "./useConfig";

const ModelViewer = (props) => {
    const config = useConfig();
    const [photo, setphoto] = React.useState('')
    const [volume, setvolume] = React.useState(0)

    function getFrame() {
      let canvas = document.getElementsByTagName('canvas')[0]
      return canvas.toDataURL()
    }
  
    const handleOnClick = () => {
      setphoto(getFrame())
    }
    //const [url, setUrl] = React.useState();
    // TODO: do not render if props.modelLink not present
    // url = undefined 
    const url = config.app.CAD_SERVICE_URL + "/models/" + props.modelId + "/preview/" + props.modelLink + ".stl";

    //setUrl(urlx); https://bvu4yujc2fonmgmjdco6s6aknq0yjjxq.lambda-url.eu-west-2.on.aws/models/0000/preview/NjAuMDs4MC4wOzEwLjA7MjIuMDsxMi4w.stl'

    return (
        <div>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <StlViewer
                    width={500}
                    height={500}
                    url={url}
                    groundColor='rgb(255, 255, 255)'
                    objectColor='rgb(25, 118, 210)'
                    skyboxColor='rgb(255, 255, 255)'
                    gridLineColor='rgb(0, 0, 0)'
                    lightColor='rgb(255, 255, 255)'
                    volume={setvolume}
                />
                {`Volume: ${volume}`}
                <Button onClick={handleOnClick}>Take Photo</Button>
                <img src={photo} />
            </Paper>
        </div>
    );
};

export default ModelViewer;