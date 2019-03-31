var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    session = require('express-session'),
    authenticationRouter = require("../routes/authenticate.router");
    calendarRouter = require("../routes/calendar.router");

module.exports.init = function() {
  //connect to database
  console.log(config.db.uri);
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  app.use(session({
    secret: "golden apple",
    resave: true,
    saveUninitialized: false
  }));

  //body parsing middleware 
  app.use(bodyParser.json());
  
  /* Serve static files */
  app.use('/', express.static('client'));

  /*Route requests to [url]/api/authenticate towards our authentication system */
  app.use('/api/authenticate', authenticationRouter);

  /*Route requests to [url]/api/calendar towards our calendar system */
  //app.use('/api/calendar', calendarRouter);

  /*Go to homepage for all routes not specified */ 
  app.all('/*', function(req, res) {
    res.redirect('/404.html')
  });

  return app;
};  
