function validateForm(destination, depDate) {
    if(!destination || !depDate) {
        throw new Error("Please fill in the forms below.")
    }
    if (!validateDate(depDate)) {
        throw new Error("Invalid date format. Please use format MM/dd/yyyy.")
    }
    if (!isFutureDate(depDate)) {
        throw new Error("Invalid date. Please specify a future date.")
    }
}

function validateDate(date) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(date))) {
        return false;
    }
    return true;
}

function isFutureDate(date){
    var today = new Date().getTime(),
    date = date.split("/");
    
    date = new Date(date[2], date[1] - 1, date[0]).getTime();
    return (today - date) < 0 ? true : false;
}

export { validateForm }
