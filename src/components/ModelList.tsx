import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import ModelInfo from './ModelInfo';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import useConfig from "./useConfig";
import { Link } from "react-router-dom";

const ModelList = (props) => {
    const config = useConfig();
    const [models, setModels] = useState([]);

    const imageSrc = config.app.PUBLIC_URL + "/tocmain1.png";

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {

        const fetchModels = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            try {
              const response = await fetch(config.app.CAD_SERVICE_URL + '/models', {
                signal: abortControllerRef.current?.signal
              });
              if (response.status == 404) {
                //should not happen
              } else if (response.status == 200) {
                const models = (await response.json());
                setModels(models);
              } else {
                console.log("Something goes wrong!", response);
                alert("API is having some technical problems. Please come back later.");
              }
            } catch (err: any) {
              if (err.name === "AbortError") {
                console.info("API call was cancelled!");
              } else {
                console.error("The API service is not working!!", err.name);  // connection is dead service is not responding
                alert("It seems like there is no API connection or the service is down. Please try again later.");
              }
            } finally {
              //console.log("it is done");
            }
          };
      
          fetchModels();
    }, []);

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;
    //     fetch(config.app.CAD_SERVICE_URL + '/models', { signal })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setModels(data);
    //         })
    //         .catch(err => {
    //             if (err.name === "AbortError") {
    //                 console.log("API call was cancelled!");
    //             } else {
    //                 console.log(err.name);
    //             }
    //         });
    //     return () => {
    //         controller.abort();
    //     }
    // }, []);

    return (
        <Grid container spacing={3}>
            {models.map((model) => (
                <>
                    {model.listed &&
                        <Grid item xs={12} md={8} lg={4} key={model.id}>
                            <Link to={`/models/${model.id}`} style={{ textDecoration: 'none' }}>
                                <Card variant="outlined"
                                    sx={{
                                        maxWidth: 360,
                                        height: 200,
                                        borderRadius: 2,
                                        boxShadow: 4,
                                        position: 'relative',
                                        backgroundImage: `url(${imageSrc})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(255,255,255,0.5) 100%)',
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            position: 'relative',
                                            zIndex: 1,
                                            color: 'text.primary',
                                            padding: '0px'
                                        }} >
                                        <ModelInfo model={model} />
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    }
                </>
            ))}
        </Grid>
    );
}

export default ModelList;