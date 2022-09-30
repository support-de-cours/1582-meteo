"use strict";

const express = require('express');
const router = express.Router();


// Controllers settings
// --

// Define the path of the "Tomorrow" page
const path_url = "/tomorrow";

// Define the "Tomorrow" page controller
const controller = (request, response, next) => {

    response.render('pages/tomorrow');

}


// Route definition
// --

router.get(path_url, controller);



// Export router
// --

module.exports = router;