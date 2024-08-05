import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ModelConfigItem from './ModelConfigItem';
import Typography from '@mui/material/Typography';
import { Buffer } from 'buffer';
import useConfig from "./useConfig";
import { Validator } from "../tools/Validator";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ModelConfig = (props) => {
  const config = useConfig();
  const [formFields, setFormFields] = useState({});
  const [compulsory, setCompulsory] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [text, setText] = useState<string>("hello");

  useEffect(() => {
    fetch(config.app.CAD_SERVICE_URL + '/models/' + props.modelId + '/validator')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFormValues(data.model_details.default);
        setCompulsory(data.model_details.required);
        setFormFields(data.model_details.properties);
      });
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    var linkString = ""
    for (var i = 0; i < event.target.form.length; i++) {
      if (event.target.form[i].nodeName != "BUTTON") {
        console.log(event.target.form[i].name + " : " + event.target.form[i].value);
        linkString = linkString + event.target.form[i].value + ";"
      }
    }
    linkString = linkString.slice(0, -1);
    var buf = Buffer.from(linkString, 'utf8');
    var randomURLSafeBase64 = Buffer.from(linkString, 'utf8').toString('base64');
    console.log(linkString);
    console.log(randomURLSafeBase64);
    props.setModelLink(randomURLSafeBase64)
    //  IMPLEMENT VALIDATION  HERE 
    // if valid
    // build link
    // build request
  }

  const onChange = (event) => {
    //event.preventDefault();
    //console.log(event);
    var paramsObject = {};
    for (var i = 0; i < event.target.form.length; i++) {
      if (event.target.form[i].nodeName != "BUTTON") {
        //console.log(event.target.form[i].name + " : " + event.target.form[i].value);
        if (event.target.form[i].value != "") {
          paramsObject[event.target.form[i].name] = event.target.form[i].value;
        }
      }
    }

    var valResult = Validator(paramsObject, formFields, compulsory);
    // here validate the form
    // if not OK repport form issues
    // if ok send to validator for recalc
    if (valResult.isValid) {
      let ffields = { ...formFields };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valResult.payload)
      };
      fetch(config.app.CAD_SERVICE_URL + '/models/' + props.modelId + '/validator', requestOptions)
        .then(response => response.json())
        .then(data => {
          setFormValues({...formValues, ...data})
        })
    }
  }


  useEffect(() => {
    console.log("formValues after update");
    console.log(formValues);
  }, [formValues])


  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
      <Typography gutterBottom variant="h6" component="div">
        Parameters
      </Typography>
      {Object.keys(formFields).map((key, id) => (
        <ModelConfigItem dpa={formValues} changeHandler={onChange} key={id} paramName={key} paramParams={formFields[key]} formValue={formValues[key]} compulsory={compulsory.includes(key) ? 'true' : 'false'} />
      ))}
      <Button onClick={onSubmit} type="submit">Render</Button>
    </Box>
  );
};

export default ModelConfig;

//   NjAuMDs4MC4wOzEwLjA7MjIuMDsxMi4w
///  60.0;80.0;10.0;22.0;12.0   

//   NjA7ODA7MTA7MTI7MjI
///  60;80;10;12;22


//   NjAuMDs4MC4wOzEwLjA7MTIuMDsyMi4w

/// 60.0;80.0;10.0;22.0;12.0
/// NjAuMDs4MC4wOzEwLjA7MjIuMDsxMi4w