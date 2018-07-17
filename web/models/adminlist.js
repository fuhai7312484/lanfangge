const mongoose = require('mongoose');
const adminlistSchema = require('../schemas/adminlist');

module.exports = mongoose.model('AdminList', adminlistSchema);