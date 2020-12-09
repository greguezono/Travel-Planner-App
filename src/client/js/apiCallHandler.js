async function handleGeonamesApiCall(data) {
    try {
        let res = await fetch('http://localhost:8081/postGeoNames', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let resData = res.json()
        return resData
    } catch (error) {
        console.log(error)
    }
}

async function handleWeatherBitApiCall(data) {

}

export { handleGeonamesApiCall }