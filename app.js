'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require("connect-flash");
var helmet = require('helmet');
var csrf = require('csurf');

var config = require('./config');
var routes = require('./routes/index');
var users = require('./routes/users');

// create express app
var app = express();

// keep reference to config
app.config = config;

// setup mongoose
app.db = mongoose.createConnection(require('./database').uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function(){
  //we have data store
});

// config data models
require('./models')(app, mongoose);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cryptoKey));
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({
  secret: config.cryptoKey
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(csrf({ cookie: { signed: true } }));
// helmet(app);

// // response locals
// app.use(function(req, res, next){
//   res.cookie('_csrfToken', req.csrfToken());
//   res.locals.user = {};
//   res.locals.user.defaultReturnUrl = req.user.defaultReturnUrl();
//   res.locals.user.username = req.user.username;
//   next();
// });

// setup passport
require('./passport')(app, passport);

// setup routes
require('./routes')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
