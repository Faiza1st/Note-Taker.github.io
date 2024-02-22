const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 9000;

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));


app.use(express.json());

app.use(express.static(path.join(__dirname + '/app/public')));

require("./app/routing/api-routes.js")(app);

 
require("./app/routing/html-routes.js")(app);


// Start the server
app.listen(PORT, function () {
    console.log('Server is running on http://localhost:' + PORT)
});