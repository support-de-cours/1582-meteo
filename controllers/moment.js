"use strict";

const fs = require('fs');
const path = require('path');
const express = require('express');
const wmo = require('./../config/wmo');

const router = express.Router();

const {
    getIp, 
    getLocation, 
    getWeather
} = require('./../utils/getApi');




// Controllers settings
// --

// Define the path of the "Moment" page
const path_url = "/";

// Define the "Moment" page controller
const controller = async (request, response, next) => {
    try {
        const ip = await getIp();
        const location = await getLocation(ip);
        const weather = await getWeather(location.lat, location.lon);
        const current = weather.current_weather;
        const units = weather.hourly_units;
        
        let icon = '';
        let description = '';
        
        for (let item of wmo)
        {
            if (item.code === current.weathercode)
            {
                const file = path.join(__dirname, '..', 'public/icons', item.icon);
                const file_content = fs.readFileSync( file, {encoding:'utf8', flag:'r'} );
        
                // console.log( file_content );
        
                icon = file_content;
                description = item.description;
            }
        }
        
        response.render('pages/moment', {
            ip: ip,
        
            city: location.city,
            country: location.countryCode,
        
            temperature: current.temperature,
            temperatureUnit: units.temperature_2m,
        
            windspeed: current.windspeed,
            winddirection: current.winddirection,
            windspeedUnit: units.windspeed_10m,
        
            code: current.weathercode,
            icon: icon,
            description: description,
        });
    } catch(e)
    {
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