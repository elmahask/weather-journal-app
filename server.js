// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const corss = require('cors');
app.use(corss());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// TODO Spin up the Server
const port = 8000;
//const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})
const server = app.listen(port,listening);
//Callback to debug
function listening(){
	console.log("listening to server");
	console.log(`Running on localhost:${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
  response.send(projectData);
};

// Post Route
app.post('/addWeather', addWeatherRequest);

function addWeatherRequest (request, response){
    console.log(request.body);
    projectData['temp'] = request.body.temp;
    projectData['date'] = request.body.date;
    projectData['content'] = request.body.content;
    response.send(projectData);
}

