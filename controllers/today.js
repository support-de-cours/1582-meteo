"use strict";

const express = require('express');
const router = express.Router();

const {
    getIp, 
    getLocation, 
    getWeather
} = require('./../utils/getApi');


// Controllers settings
// --

// Define the path of the "today" page
const path_url = "/today";

// Define the "today" page controller
const controller = async (request, response, next) => {
    try {
        const ip = await getIp();
        const location = await getLocation(ip);
        const weather = await getWeather(location.lat, location.lon);
        const units = weather.hourly_units;

        const current_date = new Date();
        const current_day = current_date.getDate();
        const current_month = current_date.getMonth();
        const current_hour = current_date.getHours();

        let data = [];

        for (let index in weather.hourly.time)
        {
            const time = weather.hourly.time[index];
            const temperature = weather.hourly.temperature_2m[index];
            const wind = weather.hourly.windspeed_10m[index];
            const humidity = weather.hourly.relativehumidity_2m[index];
            const code = weather.hourly.weathercode[index];

            const date = new Date(time);
            const day = date.getDate();
            const month = date.getMonth();
            const hour = date.getHours();

            const hourTxt = hour <= 9 ? `0${hour}` : hour;

            if (
                (
                    month == current_month &&
                    day == current_day &&
                    hour >= current_hour
                ) 
                ||
                (
                    (
                        month == current_month + 1 ||
                        month == 1
                    )
                    &&
                    day == 1 &&
                    hour <= current_hour
                )
            )
            {
                data.push({
                    hour: hourTxt,
                    date: date,

                    temperature: temperature,
                    temperatureUnit: units.temperature_2m,

                    wind: wind,
                    windUnit: units.windspeed_10m,

                    humidity: humidity,
                    humidityUnit: units.relativehumidity_2m,

                    code: code,
                });
            }
        }
        response.render('pages/today', {
            data: data
        });
    } catch (e) {
        console.log(e);
        response.render('pages/error');
    }
}


// Route definition
// --

router.get(path_url, controller);



// Export router
// --

module.exports = router;