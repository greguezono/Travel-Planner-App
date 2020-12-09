async function handlePostCall(data, path) {
    try {
        let res = await fetch('http://localhost:8081' + path, {
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

export { 
    handlePostCall
}