import { handleGeonamesApiCall } from './apiCallHandler.js';

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let city = document.getElementById('city').value
    let depDate = document.getElementById('depDate').value
    let retDate = document.getElementById('retDate').value
    try{
        Client.validateForm(city, depDate, retDate)
    } catch (error) {
        alert(error.message)
    }
    handleGeonamesApiCall(city).then( function (userData) {
        console.log(userData)
    })
}

export { handleSubmit }