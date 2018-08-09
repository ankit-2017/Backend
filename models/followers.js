const  mongoose = require('mongoose');
const followerSchema = require('../Database/schema').followers
const followers = mongoose.model('followers', followerSchema )

module.exports = followers