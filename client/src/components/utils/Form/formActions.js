
export const validate = (element, formdata=[]) => {
    let error = [true, ''];

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid?'Must be a valid email':''}`;
        error = !valid?[valid, message] : error;
    }

    // validation for password
    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid?'Passwords do not match':''}`;
        error = !valid?[valid, message] : error;
    }

    // validation for input required
    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid?'This filed is required':''}`;
        error = !valid?[valid, message] : error;
    }
    return error;
}

export const update = (element, formdata, formname) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;
    // if user click on
    if(element.blur){
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

export const generateData = (formdata, formname) => {
    let dataToSubmit = {};

    for(let key in formdata){
        // ignore confirm data
        if(key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
        }
    }

    return dataToSubmit;
}

export const isFormValid = (formdata, formname) => {
    let formIsValid = true;

    // validate all data
    for(let key in formdata){
        formIsValid = formdata[key].valid && formIsValid;
    }

    return formIsValid;
}