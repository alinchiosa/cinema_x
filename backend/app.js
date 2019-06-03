var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var actorsRouter = require('./routes/actors');
var directorsRouter = require('./routes/directors');
var genresRoutes = require('./routes/genres');
var roomsRoutes = require("./routes/rooms");
var screeningsRoutes = require("./routes/screenings");
var seatsRoutes = require("./routes/seats");
 

require('./db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 8888);

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter);
app.use('/directors', directorsRouter);
app.use('/genres', genresRoutes)
app.use('/rooms', roomsRoutes);
app.use('/screenings', screeningsRoutes);
app.use('/seats', seatsRoutes);

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
  res.json({ error: err.message });
});

app.listen(8080, function () {
  console.log('Cinema app listening on port: 8080 ');
});

module.exports = app;
