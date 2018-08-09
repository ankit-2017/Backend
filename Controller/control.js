// const express =require('express');
// const app = express();
// const mailer = require('express-mailer');
// const mongoose = require('mongoose');
// const async = require('async');
// const bcrypt = require('bcryptjs');
// const md5 = require('md5');
// const multer  = require('multer');
// const path = require('path')
//
// require('../config/Mail');
// require('../config/dbconfig');
//
// // mailer
//
// // mailer.extend(app, {
// //     from: 'ankitdubeymail1@gmail.com',
// //     host: 'smtp.gmail.com', // hostname
// //     secureConnection: true, // use SSL
// //     port: 465, // port for secure SMTP
// //     transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
// //     auth: {
// //         user: 'ankitdubeymail1@gmail.com',
// //         pass: 'mail@#$555'
// //     }
// // });
//
// //multer config

//
//
//
// require('../models/User_details');
// // require('../models/Users');
// // require('../models/posts');
// // require('../Database/schema/Schools');
// require('../Database/schema/followers');
//
// const Users = mongoose.model('Users');
// const user_detail = mongoose.model('User_details');
// const post = mongoose.model('posts');
// const school=mongoose.model('Schools');
// const follow = mongoose.model('followers');
//
//
//
//
//



//

//
// module.exports.SchoolList=(req, res)=>{
//     async.series({
//         School1:function (callback) {
//             school.find({},(err, data)=>{
//                 if(err){
//                     console.log('error',err);
//                 }
//                 console.log(data);
//
//             })
//                 .then(data=>{
//                     const school1={
//                         status:true,
//                         message:"list school in Delhi",
//                         school2:data
//                     };
//                     res.send(school1);
//                 })
//                 .catch(error=>{
//                     console.log(error)
//                 })
//         }
//     })
// };
//
// module.exports.User_detail=(req, res)=>{
//
//     res.send('this is user detail page');
// };