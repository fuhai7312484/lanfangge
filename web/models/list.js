const mongoose = require('mongoose');
const usersSchema = require('../schemas/list');

module.exports = mongoose.model('List', usersSchema);