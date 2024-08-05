import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const ModelConfigItem = (props) => {
    const [formValue, setFormValue] = useState(props.formValue);
    const [formFieldName, setFormFieldName] = useState();
    var label;
    if (props.compulsory == "true") {
        label = props.paramParams.name + " *";
    } else {
        label = props.paramParams.name;
    }

    return (
        <>
            <TextField name={props.paramName} id="standard-basic" key={props.paramName}
                label={label}
                variant="standard"
                onChange={props.changeHandler}
                defaultValue={formValue} 
                helperText={props.paramParams.helperText}
            />
        </>
    );
};

export default ModelConfigItem;