function validateForm(destination, depDate, retDate) {
    if(!destination || !depDate || !retDate) {
        throw new Error("Please fill in the forms below.")
    }
    if (!isValidDateForm(depDate)) {
        throw new Error("Invalid date format. Please use format MM/dd/yyyy. Ex: 01/01/2020")
    }
    if (!isValidDepDate(depDate)) {
        throw new Error("Invalid date. Please specify a valid date for departure. Please note that the departure date must be within 16 days of today.")
    }
    if (!isValidRetDate(retDate)) {
        throw new Error("Invalid date. Please specify a future date for your return.")
    }
    if (!isValidDateRange(depDate, retDate)){
        throw new Error("Invalid date range. Please specify a valid date range for departure and return.")
    }
}

function isValidDateForm(date) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(date))) {
        return false;
    }
    return true;
}

function isValidDepDate(date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffInMs = new Date(date) - new Date(today)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return 0 <= diffInDays && diffInDays <= 16;
}

function isValidRetDate(date){
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    today = today.getTime();
    date = date.split("/");
    date = new Date(date[2], date[0] - 1, date[1]).getTime();
    return (today - date) <= 0 ? true : false;
}

function isValidDateRange(depDate, retDate) {
    depDate = depDate.split("/");
    depDate = new Date(depDate[2], depDate[0] - 1, depDate[1]).getTime();
    retDate = retDate.split("/");
    retDate = new Date(retDate[2], retDate[0] - 1, retDate[1]).getTime();
    return (depDate - retDate) < 0 ? true : false;
}

export { validateForm }

