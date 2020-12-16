function parseGeonamesData(reqData, data) {
    let newData = {}
    let totalResults = reqData['totalResultsCount']
    if (totalResults > 0) {
        let geonames = reqData['geonames'][0]
        newData['city'] = data['city']
        newData['depDate'] = data['depDate']
        newData['retDate'] = data['retDate']
        newData['country'] = geonames['countryName']
        newData['lat'] = geonames['lat']
        newData['long'] = geonames['lng']
    }
    return newData
}

function parseWeatherBitData(reqData, data, diffInDays) {
    let reqMap = reqData['data']
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
    let today = new Date()
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

function parsePixabayData(reqData, data) {
    if (reqData['totalHits'] && reqData['totalHits'] > 0) {
        let reqMap = reqData['hits'][0]
        data['img'] = reqMap['largeImageURL']
    }
    console.log("Inside helpers.js")
}

export { 
    parseGeonamesData,
    parseWeatherBitData,
    isThisWeek,
    getDiffInDays,
    getTripDuration,
    parsePixabayData 
}