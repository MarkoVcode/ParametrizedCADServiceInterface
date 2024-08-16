import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useConfig from "./useConfig";
import { isFormDataDifferent } from "../tools/CadQueryAPI";
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';

const ModelForm = (props) => {
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
        if (!config.app.RENDER_ON_PARAM_CHANGE && data.formsData.objectLink != undefined) {
          props.setModelLink(data.formsData.objectLink);
        }
      });
  }, [])

  useEffect(() => {
    if (config.app.RENDER_ON_PARAM_CHANGE) {
      props.setModelLink(formValues.objectLink);
    }
  }, [formValues])

  const onChange = ({ errors, data }) => {
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
            setFormValues({ ...newdata })
          })
      }
    }
  }

  const onRender = (event) => {
    event.preventDefault();
    if (formValues.objectLink != undefined) {
      props.setModelLink(formValues.objectLink);
    }
  }

  return (
    <Paper sx={{
      p: 2, display: 'flex', flexDirection: 'column', borderRadius: 2,
      boxShadow: 4
    }}>
      <Typography gutterBottom variant="h6" component="div">
        Model Parameters [mm]
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
      {!config.app.RENDER_ON_PARAM_CHANGE &&  <Button onClick={onRender} type="submit" variant="contained">Render Preview</Button>}
    </Paper>
  );
};

export default ModelForm;