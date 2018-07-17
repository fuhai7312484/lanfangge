
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    adminEmail:String,
    adminPhone:Number,
    adder:String,
    time:Number,
    sex:String,
    userstate:Boolean,
});