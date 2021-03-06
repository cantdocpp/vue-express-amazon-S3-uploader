const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.connect('mongodb://philip:mongoose@ds231740.mlab.com:31740/ecommerce', (err) => {
  if (err) {
    console.log(err, 'err')
  } else {
    console.log('database connected')
  }
})

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const imageRouter = require('./routes/image');

const app = express();
app.use(cors())
app.use('/static', express.static(path.join(__dirname, "static")))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/image', imageRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
