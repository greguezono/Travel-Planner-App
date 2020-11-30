// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const cors = require('cors');

// Start up an instance of app
const app = express();

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Update server to use dist folder
app.use(express.static('dist'));

// Setup Server
const port = 5000;
const server = app.listen(port, () => {console.log(`Server ${server} running on localhost: ${port}`)});

// Get method route
app.get('/get',  function (req, res) {
    
})

// Post method route
app.post('/post', function (req, res) {

})