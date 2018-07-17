const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    adminName:String,
    password:String,
    adminemail:String,
    groupsId:String,
    groupsName:String,
    time:Number,

});