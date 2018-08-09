/* posts schema */

const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const posts = new Schema({
    user_id:String,
    username:String,
    hashtag:Array,
    caption:String,
    location:String,
    post_time:Date,
    images:Array

});

module.exports = posts