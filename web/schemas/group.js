const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    pname:String,
    pdesc:String,
    pstate:Boolean,
    members:Array,

});