
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    sex:String,
    password: String,
    adminEmail:String,
    adminPhone:Number,
    adder:String,
    time:Number,
    userstate:Boolean,
});