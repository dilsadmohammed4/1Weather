const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");


})
app.post('/', (req, res) => {
    const cityName = req.body.cityName;
    const apiKey = "c755caa79ff82f49e00616d229ea3533";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey;
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const wIcon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + wIcon + "@2x.png";
            res.write("<h1>" + city + "</h1>");
            res.write("<h4>Tempereture: " + temp + "</h4>");
            res.write("<p>" + weatherDescription + "</p>");
            res.write("<img src=" + imageUrl + " >")
            res.send();


        })
    })
})




app.listen(3000, () => {
    console.log("Server running in port 3000..");
})