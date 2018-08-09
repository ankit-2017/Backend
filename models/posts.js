const  mongoose = require('mongoose');
const PostSchema = require('../Database/schema').posts
const posts = mongoose.model('posts', PostSchema )

module.exports = posts