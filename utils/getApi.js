"use strict";

const config = require('./../config/settings');
const axios = require('axios');
const replace = require('./strReplace');

exports.getIp = async function()
{
    const url = config.ip_api;
    const response = await axios.get(url);
    return await response.data;
}

exports.getLocation = async function (ip)
{
    const url = replace(config.location_api, {
        ip: ip
    });
    const response = await axios.get(url);
    return await response.data;
}

exports.getWeather = async function (latitude, longitude)
{
    const url = replace(config.weather_api, {
        latitude: latitude,
        longitude: longitude
    });
    const response = await axios.get(url);
    return await response.data;
}