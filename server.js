"use strict";

const config = require('./config/settings');
const replace = require('./utils/strReplace');

const path = require('path');
const ejs = require('ejs')

const express = require('express');
const app = express();
const port = require('./utils/port')();

// App settings
// --

// Define the "views" directory
app.set('views', path.join(__dirname, "views"));

// Define the HTML engine
app.set('view engine', "html");
app.engine('html', ejs.__express);

// Add the access to the "public" directory
app.use( express.static( path.join(__dirname, "public") ) );



// App routings
// --

app.use( require('./controllers/moment') );
app.use( require('./controllers/today') );
app.use( require('./controllers/tomorrow') );


// Server Start
// --

app.listen(port, () => console.log(`App is listening on port http://localhost:${port}`))

exports.port = port;