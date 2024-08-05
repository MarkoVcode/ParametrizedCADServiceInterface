
export const Validator = (formObject, validator, compulsory) => {
    console.log("This is validator");
    console.log(formObject);
    var requestPayload = {};
    var formErrors = {};
    var isValid = true;

    Object.keys(formObject).forEach(function(field) {
        var paramValue = formObject[field];
        if (validator[field].type == "number") {
            var paramValueB = parseFloat(paramValue);
            //check validation here
            if (paramValueB >= validator[field].minimum && paramValueB <= validator[field].maximum) {
                requestPayload[field] = paramValueB;
            } else {
                isValid = false;
                formErrors[field] = "The value out of range " + validator[field].minimum + " <= x <= " + validator[field].maximum
            }  
        } else {
            requestPayload[field] = paramValue;
        }
    });

    console.log(formErrors);
    // return validation status,
    // object to be sent,
    // form error messages in case of fail
    //for numerical values parseFloat(
    return {
        isValid: isValid,
        payload: requestPayload,
        formErrors: formErrors
    }
}

export const ConvertToFormFields = (formObject, formFields) => {
   // console.log(formFields)
  //  console.log(formObject)
    var newFormFields = formFields;
    Object.keys(formObject).forEach(function(field) {
        var paramValue = formObject[field];
        if (newFormFields[field] != undefined) {
            newFormFields[field].default = paramValue;
        }
    });
   // console.log(newFormFields)
    return newFormFields;
}