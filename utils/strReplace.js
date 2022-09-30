"use strict";

module.exports = function (string, data={}) 
{
    for (const key in data) 
    {
        string = string.replace(`%${key}%`, data[key]);
    }

    return string;
}