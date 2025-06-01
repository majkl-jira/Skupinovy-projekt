var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();

// Import routeru pro email a recepty
const emailRouter = require('./routes/email');
const recipeRouter = require('./routes/recipes');  // nový router pro recepty
const usersRouter = require("./routes/users");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));


// CORS nastavení (otevřené pro všechny, můžeš upravit)
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Statické soubory
app.use(express.static(path.join(__dirname, 'public')));

// API endpointy
app.use("/users", usersRouter);
app.use('/email', emailRouter);
app.use('/recepty', recipeRouter);  // zde endpoint pro recepty

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000, () => console.log("server běží na 5000"));

module.exports = app;
