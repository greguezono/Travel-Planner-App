function validateForm(destination, depDate, retDate) {
    if(!destination || !depDate || !retDate) {
        throw new Error("Please fill in the forms below.")
    }
    if (!validateDate(depDate)) {
        throw new Error("Invalid date format. Please use format MM/dd/yyyy.")
    }
    if (!isFutureDate(depDate)) {
        throw new Error("Invalid date. Please specify a future date for departure.")
    }
    if (!isFutureDate(retDate)) {
        throw new Error("Invalid date. Please specify a future date for your return.")
    }
    if (!isValidDateRange(depDate, retDate)){
        throw new Error("Invalid date range. Please specify a valid date range for departure and return.")
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
    
    date = new Date(date[2], date[0] - 1, date[1]).getTime();
    return (today - date) < 0 ? true : false;
}

function isValidDateRange(depDate, retDate) {
    depDate = depDate.split("/");
    depDate = new Date(depDate[2], depDate[1] - 1, depDate[0]).getTime();
    retDate = retDate.split("/");
    retDate = new Date(retDate[2], retDate[1] - 1, retDate[0]).getTime();
    return (depDate - retDate) < 0 ? true : false;
}

export { validateForm }
