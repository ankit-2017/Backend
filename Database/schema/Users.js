/* Users schema */

const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    verification_token:String,
    account_status:Boolean,
    user_type:String
});

module.exports = Users
// module.exports = mongoose.model('Users', Users);