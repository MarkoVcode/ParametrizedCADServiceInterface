export const ObjectLinkAssembler = (fieldsOrder, formData) => {
    var objectLinkID = ""

    return ObjectLinkEncoder(objectLinkID);
}

const ObjectLinkEncoder = (objectLinkID) => {
    return objectLinkID;
}

export const ObjectLinkDecoder = (fieldsOrder, objectLinkEncoded) => {
    var formData = {}
    return formData;
}

export async function fetchModel(config, modelId) {
    console.log("Making call:" +  modelId)
    fetch(config.app.CAD_SERVICE_URL + '/models/' + modelId)
    .then(res => res.json())
    .then((data) => { 
        console.log("response: " + data);
        return data;
     })
    .catch(e => console.log(e))
}

export const isFormDataDifferent = (oldData, newData) => {
    var response = false;
    Object.keys(oldData).map((key, id) => {
        //console.log(key + "--" + oldData[key] + "--" + newData[key])
        if (oldData[key] != newData[key]) {
            response = true;
        }
    })
    return response;
}