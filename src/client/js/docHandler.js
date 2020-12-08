function removeTrip(event) {
    let tripSection = event.target.parentElement.parentElement;
    tripSection.parentNode.removeChild(tripSection);
}

function createTripSection(event) {
    // Create elements
    let section = document.createElement("section");
    let contentDiv = document.createElement("div");
    let location = document.createElement("h2");
    let departureDate = document.createElement("h3");
    let dayCountdown = document.createElement("h4");
    let vacationDays = document.createElement("h4");
    let weatherForcast = document.createElement("h4");
    let removeTripButton = document.createElement("button");
    let imageDiv = document.createElement("div");
    let image = document.createElement("img");
    // TODO: change align-left / align-right
    // Set classes
    const sectionClasses = ["orient-right", "spotlight", "style1", ,"image-position-center", "onscroll-image-fade-in", "content-align-left"];
    section.classList.add(...sectionClasses);
    contentDiv.classList.add("content");
    removeTripButton.setAttribute('onclick', 'Client.removeTrip(event)');
    imageDiv.classList.add("image");

    // Build Elements
    contentDiv.appendChild(location);
    contentDiv.appendChild(departureDate);
    contentDiv.appendChild(dayCountdown);
    contentDiv.appendChild(vacationDays);
    contentDiv.appendChild(weatherForcast);
    contentDiv.appendChild(removeTripButton);
    imageDiv.appendChild(image);
    section.appendChild(contentDiv);
    section.appendChild(imageDiv);
}

export { 
    removeTrip,
    createTripSection
}