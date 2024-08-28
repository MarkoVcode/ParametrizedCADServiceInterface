import * as React from 'react';
import { useState, useEffect } from 'react';
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

    useEffect(() => {
        fetch(config.app.CAD_SERVICE_URL + '/models')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setModels(data);
                // console.log(data)
            });
    }, []);

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