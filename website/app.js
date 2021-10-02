/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const query = '?q=';
const andParameter = '&appid=';

// Personal API Key for OpenWeatherMap API
const apiKey = 'e3bb451720025bfdb44292e0318afb45';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
const btn_generate = document.getElementById('generate');
btn_generate.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();
    //get input from user
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        getWeatherData(baseUrl, zipCode, apiKey)
            .then(function (data) {
                // add data to POST request
                postData('/addWeather', { temp: data.main.temp, date: newDate, content: content });
            }).then(function () {
                // call updateUI to update html content
                updateUI()
            }).catch(function (error) {
                console.log(error);
                alert('The zip code is invalid. Try again');
            });
    } else {
        alert("Plz insert correct zipcode");
    }
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(`${baseUrl}${query}${zipCode}${andParameter}${apiKey}`);
    try {
        //assign the result of fetch function to data
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        console.log(data);
        // update new entry values with the data
        if (data.date !== undefined && data.temp !== undefined && data.content !== undefined) {
            document.getElementById('date').innerHTML = 'Current Date : ' + data.date;
            document.getElementById('temp').innerHTML = 'Temp Degree : ' + data.temp + ' K';
            document.getElementById('content').innerHTML = data.content;
        }
    } catch (error) {
        console.log('error', error);
    }
};