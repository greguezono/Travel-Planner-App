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

// Setup & Start Server
const port = 8081
const server = app.listen(port, () => {console.log(`Server ${server} running on localhost: ${port}`)})

// API constants
const geonamesUsername = process.env.GEONAMES_USERNAME
const weatherBitKey = process.env.WEATHERBIT_KEY
const pixabayKey = process.env.PIXABAY_KEY

// Helper functions
import { 
    parseGeonamesData,
    parseWeatherBitData,
    isThisWeek,
    getDiffInDays,
    parsePixabayData 
} from './helpers'

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

// Path Helper Functions
function getGeonamesPath(city) {
    return `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonamesUsername}`;
}

function getCurrentWeatherBitPath(lat, long) {
    return `http://api.weatherbit.io/v2.0/current?key=${weatherBitKey}&lang=en&lat=${lat}&lon=${long}`
}

function getFutureWeatherBitPath(lat, long) {
    return `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherBitKey}&lang=en&lat=${lat}&lon=${long}`
}

function getPixabayPath(city) {
    return `https://pixabay.com/api/?key=${pixabayKey}&q=${city}&lang=en`
}
