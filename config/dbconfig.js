const express = require('express');
const app = express();
const  mongoose = require('mongoose');



const mongo = 'mongodb://localhost/hestagram';
mongoose.connect(mongo);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error') );