async function handleGeonamesApiCall(city) {
    try {
        let res = await fetch('http://localhost:8081/postGeoNames', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'city': escape(city)})
        });
        let resData = res.json()
        return resData
    } catch (error) {
        console.log(error)
    }
}

export { handleGeonamesApiCall }