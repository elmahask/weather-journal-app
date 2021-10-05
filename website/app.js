/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const query = '?q=';
const andParameter = '&appid=';

// Personal API Key for OpenWeatherMap API
const apiKey = '7ef603b1997b14f781419c4e7a65e1a7';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear();

// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate');
generate.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode.size() !== '' && zipCode.length > 1 ) {
        getWeatherData(baseUrl, zipCode, apiKey)
            .then(function (data) {
                postData('/addWeather', { temp: data.main.temp, date: newDate, content: content });
            }).then(function () {
                updateUI()
            }).catch(function (error) {
                console.log(error);
                alert('The zip code is not correct. Plz Try again');
            });
    } else {
        alert("Plz insert correct zipcode");
    }
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const res = await fetch(`${baseUrl}${query}${zipCode}${andParameter}${apiKey}`);
    try {
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
        document.getElementById('date').innerHTML = 'Current Date : ' + data.date;
        document.getElementById('temp').innerHTML = 'Temp Degree : ' + data.temp + ' K';
        document.getElementById('content').innerHTML = data.content;
    } catch (error) {
        console.log(error);
    }
};