import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ModelInfo from './ModelInfo';
import Card from '@mui/material/Card';
import useConfig from "./useConfig";
import { Link } from "react-router-dom";

const ModelList = (props) => {
    const config = useConfig();
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetch(config.app.CAD_SERVICE_URL + '/models')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setModels(data);
                console.log(data)
            });
    }, []);

    return (
        <Grid container spacing={3}>
            {models.map((model) => (
                <Grid item xs={12} md={8} lg={4} key={model.id}>
                    <Link to={`/models/${model.id}`} style={{ textDecoration: 'none' }}>
                        <Card variant="outlined"
                            sx={{
                                maxWidth: 360,
                                height: 200,
                                borderRadius: 2,
                                boxShadow: 4,
                            }}
                        >
                            <ModelInfo model={model} />
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}

export default ModelList;