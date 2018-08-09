/* follower schema */

const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followers = new Schema({
    user_id:String,
    username:String,
    follower_id:{
        type:String
    },
    follow_time:Date

});

module.exports = followers