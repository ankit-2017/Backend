const  mongoose = require('mongoose');
const UserDetailSchema = require('../Database/schema').User_details
const user_details = mongoose.model('User_details', UserDetailSchema)

module.exports = user_details