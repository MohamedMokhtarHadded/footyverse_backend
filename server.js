const app = require('express')();
const cors = require('cors');
const express = require('express')
const UserProfile = require("./models/userProfile");
const mongoose = require('mongoose')



const allowedOrigins = ['http://localhost:4200'];
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: false }))



var userRouter = require('./routes/user');
var userProfileRouter = require('./routes/userProfile');



app.use('/user', userRouter);
app.use('/userProfile', userProfileRouter);
