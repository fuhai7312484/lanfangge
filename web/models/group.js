const mongoose = require('mongoose');
const GroupSchema = require('../schemas/group');

module.exports = mongoose.model('Group', GroupSchema);