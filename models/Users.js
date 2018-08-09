const  mongoose = require('mongoose');
const UserSchema = require('../Database/schema').Users
const Users = mongoose.model('Users', UserSchema )

module.exports = Users