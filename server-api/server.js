const sassMiddleware = require('./lib/sass-middleware');
const express = require("express");
const morgan = require('morgan');

const app = express();
const PORT = 8080; // default port 8080

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

//declaring resource routes
const servicesRoutes = require('./routes/services');

//mounting resource routes
app.use('/services', servicesRoutes);

//checking if connection works
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});