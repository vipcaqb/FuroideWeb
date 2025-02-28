var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require('i18n');
var mongo = require('mongoose');
require('dotenv/config');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
var testRouter = require('./routes/test');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var contactRouter = require('./routes/contact');
var serviceRouter = require('./routes/service');
var adminRouter = require('./routes/admin/index');
var adminNewsRouter = require('./routes/admin/news');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// connect mongodb server
mongo.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongo.connection;
if (!db) {
  console.log("There Is No Data");
} else {
  console.log("MongoDb Is Connecting");
}

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);
app.use(bodyParser.json());
app.use(express.urlencoded());

//language config
i18n.configure({
  locales:['vi', 'jp'],
  directory: __dirname + '/locales',
  cookie: 'lang',
 });

//routes config
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news',newsRouter);
app.use('/test',testRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/contact',contactRouter);
app.use('/service',serviceRouter);
app.use('/admin',adminRouter);
app.use('/admin/news',adminNewsRouter);

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
