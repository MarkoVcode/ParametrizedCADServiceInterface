import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Buffer } from 'buffer';
import useConfig from "./useConfig";
import { ObjectLinkAssembler, isFormDataDifferent } from "../tools/CadQueryAPI";

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ModelConfig = (props) => {
  const config = useConfig();
  const [form, setForm] = useState({});
  const [formUI, setFormUI] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    fetch(config.app.CAD_SERVICE_URL + '/models/' + props.modelId + '/validator')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFormValues(data.formsData);
        setForm(data.schema);
        setFormUI(data.uischema);
      });
  }, [])

  const onChange = ({ errors, data }) => {
    console.log(isFormDataDifferent(formValues, data));
    if (isFormDataDifferent(formValues, data)) {
      if (errors.length == 0) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };
        fetch(config.app.CAD_SERVICE_URL + '/models/' + props.modelId + '/validator', requestOptions)
          .then(response => response.json())
          .then(newdata => {
            //do not update if status code != 200
            setFormValues({ ...newdata})
          })
      }
    }
  }

  const onRender = (event) => {
    event.preventDefault();
    if(formValues.objectLink != undefined) {
      props.setModelLink(formValues.objectLink);
    }
  }
  //https://stackoverflow.com/questions/56219640/how-to-download-a-file-through-an-api-in-react
  return (
    <Container maxWidth="sm">
      <Typography gutterBottom variant="h6" component="div">
        Model Parameters
      </Typography>
      <JsonForms
        schema={form}
        uischema={formUI}
        data={formValues}
        renderers={materialRenderers}
        cells={materialCells}
        validationMode="ValidateAndShow"
        onChange={onChange}
      />
      <Button onClick={onRender} type="submit" variant="contained">Render Preview</Button>
    </Container>
  );
};

export default ModelConfig;