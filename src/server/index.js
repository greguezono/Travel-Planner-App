// Required modules
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require("node-fetch")
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// Start up an instance of app
const app = express()

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Update server to use dist folder
app.use(express.static('dist'))

// Setup Server
const port = 8081
const server = app.listen(port, () => {console.log(`Server ${server} running on localhost: ${port}`)})

// Api constants
const geonamesUsername = process.env.GEONAMES_USERNAME
const weatherBitKey = process.env.WEATHERBIT_KEY
const pixabayKey = process.env.PIXABAY_KEY

// Geonames Post Method Route
app.post('/postGeoNames', async function (req, res) {
    let data = req.body
    let path = getGeonamesPath(data['city'])
    let apiRes = await fetch(path)
    try {
        let reqData = await apiRes.json()
        let newData = parseGeonamesData(reqData, data)
        res.send(JSON.stringify(newData))
    } catch (error) {
        console.log(error)
    }
})

function getGeonamesPath(city) {
    return `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonamesUsername}`;
}

function parseGeonamesData(reqData, data) {
    let newData = {}
    totalResults = reqData['totalResultsCount']
    if (totalResults > 0) {
        geonames = reqData['geonames'][0]
        newData['city'] = data['city']
        newData['depDate'] = data['depDate']
        newData['retDate'] = data['retDate']
        newData['country'] = geonames['countryName']
        newData['lat'] = geonames['lat']
        newData['long'] = geonames['lng']
    }
    return newData
}

// WeatherBit Post Method Route
app.post('/postWeatherBit', async function (req, res) {
    let data = req.body
    let path
    let diffInDays
    if (isThisWeek(data['depDate'])) {
        path = getCurrentWeatherBitPath(data['lat'], data['long'])
        diffInDays = 0
    } else {
        path = getFutureWeatherBitPath(data['lat'], data['long']) 
        diffInDays = getDiffInDays(data['depDate'])
    }
    
    let apiRes = await fetch(path)
    try {
        let reqData = await apiRes.json()
        parseWeatherBitData(reqData, data, diffInDays)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
})

function getCurrentWeatherBitPath(lat, long) {
    return `http://api.weatherbit.io/v2.0/current?key=${weatherBitKey}&lang=en&lat=${lat}&lon=${long}`
}

function getFutureWeatherBitPath(lat, long) {
    return `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherBitKey}&lang=en&lat=${lat}&lon=${long}`
}

function parseWeatherBitData(reqData, data, diffInDays) {
    reqMap = reqData['data']
    if (diffInDays != 0) {
        reqMap = reqMap[diffInDays - 1]
    } else {
        reqMap = reqMap[0]
    }
    data['temp'] = reqMap['temp']
    data['precip'] = reqMap['precip']
    data['clouds'] = reqMap['clouds']
    data['days'] = getTripDuration(data['depDate'], data['retDate'])
}

// src = https://stackoverflow.com/questions/36787908/how-to-check-if-date-is-in-this-week-in-javascript
function isThisWeek (depDate) {
    return getDiffInDays(depDate) <= 7
}

function getDiffInDays(depDate) {
    var today = new Date()
    today.setHours(0, 0, 0, 0)
    const diffInMs = new Date(depDate) - new Date(today)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
    return diffInDays
}

function getTripDuration(depDate, retDate) {
    const diffInMs = new Date(retDate) - new Date(depDate)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
    return diffInDays
}

// Pixabay Post Method Route
app.post('/postPixabay', async function (req, res) {
    let data = req.body
    let path = getPixabayPath(data['city'])
    let apiRes = await fetch(path)
    try {
        let reqData = await apiRes.json()
        parsePixabayData(reqData, data)
        res.send(JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
})

function getPixabayPath(city) {
    return `https://pixabay.com/api/?key=${pixabayKey}&q=${city}&lang=en`
}

function parsePixabayData(reqData, data) {
    if (reqData['totalHits'] && reqData['totalHits'] > 0) {
        reqMap = reqData['hits'][0]
        data['img'] = reqMap['largeImageURL']
    }
}