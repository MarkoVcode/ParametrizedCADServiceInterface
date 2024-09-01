import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useConfig from "./useConfig";
import { isFormDataDifferent } from "../tools/CadQueryAPI";
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { useParams } from 'react-router-dom';
import { JsonForms } from '@jsonforms/react';

const ModelForm = (props) => {
  const config = useConfig();
  const [form, setForm] = useState({});
  const [formUI, setFormUI] = useState([]);
  const [formValues, setFormValues] = useState({});
  // const [triggerLinkRender, setTriggerLinkRender] = useState(false);
  const params = useParams();

  const selectData = (data, modelPath) => {
    //  console.log("selectData works")
    const dataFromLocal = localStorage.getItem(modelPath);
    if (dataFromLocal != undefined) {
      localStorage.removeItem(modelPath);
      // setTriggerLinkRender(true);
      return JSON.parse(dataFromLocal);
    }
    return data;
  }

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {

      const fetchValidator = async () => {
          abortControllerRef.current?.abort();
          abortControllerRef.current = new AbortController();
          try {
            const response = await fetch(config.app.CAD_SERVICE_URL + '/models/' + params.modelId + '/validator', {
              signal: abortControllerRef.current?.signal
            });
            if (response.status == 404) {
              //should not happen here
            } else if (response.status == 200) {
              const data = (await response.json());
              setFormValues(selectData(data.formsData, "/models/" + params.modelId));
              setForm(data.schema);
              setFormUI(data.uischema);
              if (!config.app.RENDER_ON_PARAM_CHANGE && data.formsData.objectLink != undefined) {
                props.setModelLink(data.formsData.objectLink);
              }
            } else {
              console.log("Something goes wrong!", response);
              alert("API is having some technical problems. Please come back later.");
            }
          } catch (err: any) {
            if (err.name === "AbortError") {
              console.info("API call was cancelled!");
            } else {
              console.error("The API service is not working!!", err);  // connection is dead service is not responding
              alert("It seems like there is no API connection or the service is down. Please try again later.");
            }
          } finally {
            //console.log("it is done");
          }
        };
    
        fetchValidator();
  }, []);

  useEffect(() => {
    if (config.app.RENDER_ON_PARAM_CHANGE) {
      //  console.log("confirmed rerender"); || triggerLinkRender
      // setTriggerLinkRender(false);
      props.setModelLink(formValues.objectLink);
    }
    props.setModelParams(formValues);
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
      {!config.app.RENDER_ON_PARAM_CHANGE && <Button onClick={onRender} type="submit" variant="contained">Render Preview</Button>}
    </Paper>
  );
};

export default ModelForm;