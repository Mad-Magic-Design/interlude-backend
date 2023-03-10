const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const interludeRoutes = require('./routes/interludeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();



app.use(bodyParser.json());

app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
    next();
})

app.get('/', function (req,res){
  res.send('sup cruel world')
})


app.use('/interlude', interludeRoutes)
app.use('/user', userRoutes)

app.use((error, req, res, next) =>{
  if (res.headerSent){
    return next(error)
  }
  res.status(error.code || 500)
  res.json({message: error.message} || "An unknown error occured")
})


mongoose
  .connect(
    process.env.MONGODB_URI
    )
  .then(() => {
    app.listen(5000);
    console.log('meet me on port 5000')
  })
  .catch(err => {
    console.log(err);
  });
