// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Start up an instance of app
const app = express();

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Update server to use dist folder
app.use(express.static('dist'));

// Setup Server
const port = 8081;
const server = app.listen(port, () => {console.log(`Server ${server} running on localhost: ${port}`)});

// Api constants
const geonamesUsername = process.env.GEONAMES_USERNAME;

// Geonames Post Method Route
app.post('/postGeoNames', async function (req, res) {
    let city = req.body.city
    console.log(city)
    let path = getGeonamesPath(city)
    let apiRes = await fetch(path)
    try {
        let data = await apiRes.json()
        let newData = parseGeonamesData(data)
        res.send(JSON.stringify(newData))
    } catch (error) {
        console.log(error)
    }
})

function getGeonamesPath(city) {
    console.log(geonamesUsername)
    return `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonamesUsername}`;
}

function parseGeonamesData(data) {
    let newData = {}
    totalResults = data['totalResultsCount']
    if (totalResults > 0) {
        geonames = data['geonames'][0]
        newData['country'] = geonames['countryName']
        newData['lat'] = geonames['lat']
        newData['long'] = geonames['lng']
    }
    return newData
}