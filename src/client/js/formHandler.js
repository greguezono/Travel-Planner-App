function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let destination = document.getElementById('destination').value
    let depDate = document.getElementById('depDate').value
    let retDate = document.getElementById('retDate').value
    try{
        Client.validateForm(destination, depDate, retDate)
    } catch (error) {
        alert(error.message)
    }
}

export { handleSubmit }