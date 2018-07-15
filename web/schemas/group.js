const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    key:Number,
    pid:Number,
    pname:String,
    pdesc:String,
    pstate:Boolean,
});