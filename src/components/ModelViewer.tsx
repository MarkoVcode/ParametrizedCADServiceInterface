import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StlViewer } from "react-stl-file-viewer";
import useConfig from "./useConfig";

const ModelViewer = (props) => {
    const config = useConfig();
    const [photo, setphoto] = React.useState('')
    const [volume, setvolume] = React.useState(0)
    const [width, setWidth] = React.useState(730);
    const [height, setHeight] = React.useState(500);

    function getFrame() {
        let canvas = document.getElementsByTagName('canvas')[0]
        return canvas.toDataURL()
    }

    const handleOnClick = () => {
        setphoto(getFrame())
    }

    const observedDiv = React.useRef(null);

    //https://stackoverflow.com/questions/73247936/how-to-dynamically-track-width-height-of-div-in-react-js

    React.useEffect(() => {
        console.log("OBSERVER");
        if (!observedDiv.current) {
            // we do not initialize the observer unless the ref has
            // been assigned
            return;
        }

        // we also instantiate the resizeObserver and we pass
        // the event handler to the constructor
        const resizeObserver = new ResizeObserver(() => {
            if (observedDiv.current.offsetWidth !== width) {
                setWidth(observedDiv.current.offsetWidth);
            }
            if (observedDiv.current.offsetHeight !== height) {
                setHeight(observedDiv.current.offsetHeight);
            }
        });

        // the code in useEffect will be executed when the component
        // has mounted, so we are certain observedDiv.current will contain
        // the div we want to observe
        resizeObserver.observe(observedDiv.current);


        // if useEffect returns a function, it is called right before the
        // component unmounts, so it is the right place to stop observing
        // the div
        return function cleanup() {
            resizeObserver.disconnect();
        }
    },
        // only update the effect if the ref element changed
        [observedDiv.current])

    //const [url, setUrl] = React.useState();
    // TODO: do not render if props.modelLink not present
    // url = undefined
    var url = null;
    if (props.modelLink != undefined) {
        url = config.app.CAD_SERVICE_URL + "/models/" + props.modelId + "/preview/" + props.modelLink + ".stl";
    }
    //setUrl(urlx); https://bvu4yujc2fonmgmjdco6s6aknq0yjjxq.lambda-url.eu-west-2.on.aws/models/0000/preview/NjAuMDs4MC4wOzEwLjA7MjIuMDsxMi4w.stl'
    const volumeRound = Math.round((volume + Number.EPSILON) * 100) / 100;

    return (
        <Paper sx={{
            p: 2, display: 'flex', flexDirection: 'column', borderRadius: 2,
            boxShadow: 4
        }}>
            {url &&
                <>
                    <StlViewer
                        width={width}
                        height={height}
                        url={url}
                        groundColor='rgb(255, 255, 255)'
                        objectColor='rgb(25, 118, 210)'
                        skyboxColor='rgb(255, 255, 255)'
                        gridLineColor='rgb(0, 0, 0)'
                        lightColor='rgb(255, 255, 255)'
                        volume={setvolume}
                    />
                    <Typography variant="caption" display="inline" gutterBottom>
                        Object Volume: {volumeRound} mm<sup>3</sup>
                    </Typography>
                    <Button onClick={handleOnClick} variant="contained">Capture Frame</Button>
                    <img src={photo} />
                </>
            }
        </Paper>
    );
};

export default ModelViewer;