const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function removeTrip(event) {
    let tripSection = event.target.parentElement.parentElement;
    tripSection.parentNode.removeChild(tripSection);
}

function updateUI(data, orientLeft) {
    let section = createTripSection(data, orientLeft)
    let trips = document.getElementById('trips')
    trips.appendChild(section)
}

function createTripSection(data, orientLeft) {
    // Create elements
    let section = document.createElement("section");
    let contentDiv = document.createElement("div");
    let locationSection = document.createElement("h2");
    let depDateSection = document.createElement("h3");
    let daysSection = document.createElement("h4");
    let weatherSection = document.createElement("h4");
    let removeTripButton = document.createElement("button");
    let imageDiv = document.createElement("div");
    let imageSection = document.createElement("img");

    // TODO: change align-left / align-right
    // Set classes
    let sectionClasses
    if (orientLeft) {
        sectionClasses = ["orient-left", "spotlight", "style1", ,"image-position-center", "onscroll-image-fade-in", "content-align-right"];
    } else {
        sectionClasses = ["orient-right", "spotlight", "style1", ,"image-position-center", "onscroll-image-fade-in", "content-align-left"];
    }
    
    section.classList.add(...sectionClasses);
    contentDiv.classList.add("content");
    removeTripButton.setAttribute('onclick', 'Client.removeTrip(event)');
    imageDiv.classList.add("image");

    // format sections
    formatLocationSection(locationSection, data['city'], data['country'])
    formatDepDateSection(depDateSection, data['depDate'])
    formatDaysSection(daysSection, data['city'], data['days'])
    formatWeatherSection(weatherSection, data['temp'], data['precip'], data['clouds'])
    formatRemoveTripButton(removeTripButton)
    formatImageSection(imageSection, data['img'])

    // Build Elements
    contentDiv.appendChild(locationSection);
    contentDiv.appendChild(depDateSection);
    contentDiv.appendChild(daysSection);
    contentDiv.appendChild(weatherSection);
    contentDiv.appendChild(removeTripButton);
    imageDiv.appendChild(imageSection);
    section.appendChild(contentDiv);
    section.appendChild(imageDiv);
    return section
}

function formatLocationSection(section, city, country) {
    section.innerHTML = `Location: ${city}, ${country}`
}

function formatDepDateSection(section, depDate) {
    depDate = new Date(depDate)
    section.innerHTML = `Departure Date: ${monthNames[depDate.getMonth()]} ${depDate.getDate()}, ${depDate.getFullYear()}`
}

function formatDaysSection(section, city, days) {
    section.innerHTML = `You currently plan on staying at ${city} for ${days} days!`
}

function formatWeatherSection(section, temp, precip, clouds) {
    section.innerHTML = `Typical weather forcast for the first week of your trip is an average of ${temp}° C with ${getCloudInfo(clouds)} skies and ${getPrecipInfo(precip)}`
}

function formatRemoveTripButton(button) {
    button.innerHTML = `Remove Trip`
}

function formatImageSection(imageSection, image) {
    imageSection.src = image
}

function getCloudInfo(clouds) {
    if (clouds == 0) {
        return 'clear'
    } else if (clouds < 10) {
        return 'partly cloudy'
    } else {
        return 'cloudy'
    }
}

function getPrecipInfo(precip) {
    if (precip == 0) {
        return 'no chance of rain!'
    } else if (precip < 5) {
        return 'a low chance of rain.'
    } else {
        return 'a high chance of rain.'
    }
}
export { 
    removeTrip,
    updateUI,
    getCloudInfo,
    getPrecipInfo
}