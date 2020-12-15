import { handlePostCall } from './apiCallHandler'
import { updateUI } from './docHandler'

let orientLeft = true

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
        return;
    }

    let data = {"city": city, "depDate": parseDate(depDate), "retDate": parseDate(retDate)}
    handlePostCall(data, '/postGeoNames').then( function (geoData) {
        return handlePostCall(geoData, '/postWeatherBit')
    }).then( function(weatherData) {
        return handlePostCall(weatherData, '/postPixabay')
    }).then( function(pixabayData) {
        updateUI(pixabayData, orientLeft)
        orientLeft = !orientLeft
    })
}

function parseDate(date) {
    if (!date) {
        return null
    }
    date = date.split("/");
    date = new Date(date[2], date[0] - 1, date[1])
    return date
}

export { handleSubmit }