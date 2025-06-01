const express = require('express');
const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database error:", err));


app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


const usersRouter = require('./routes/users');
const recipeRouter = require('./routes/recipes'); 
const emailRouter = require('./routes/email');

app.use('/users', usersRouter);
app.use('/recipes', recipeRouter); 
app.use('/email', emailRouter);


app.use((req, res, next) => {
  next(createError(404));
});


app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


app.listen(5000, () => {
  console.log("🚀 Server běží na http://localhost:5000");
});

module.exports = app;
