/* User Details schema */

const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_details = new Schema({
    user_id:String,
    username:String,
    Email:String,
    mobile_no:Number,
    password:String,
    fullname:String,
    city:String,
    school:String,
    college:String,
    profession:String,
    Hobbies:String,
    profile_img:String,
    time1:Date
});

module.exports = User_details