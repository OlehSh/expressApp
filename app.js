const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const passport = require('passport');
const index = require('./routes/index');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', index);
app.use((req, res, next) => {
  res.status(404);
  res.json({
    status: 404,
    message: 'Route not found',
  });
  next();
});
app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    status: 500,
    message: err.message,
  });
  next();
});

module.exports = app;
