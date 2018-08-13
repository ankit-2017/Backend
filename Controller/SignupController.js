const async = require('async');
const bcrypt = require('bcryptjs');
const md5 = require('md5');
const express =require('express');
const app = express();
const mailer = require('express-mailer');


// mailer.extend(app, {
//     from: 'ankitdubeymail@gmail.com',
//     host: 'smtp.gmail.com', // hostname
//     secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//     transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//     auth: {
//         user: 'ankitdubeymail@gmail.com',
//         pass: 'a@n@k@t@123'
//     }
// });


const Users = require('../models/Users');
let user_detail = require('../models/User_details')
let follow = require('../models/followers');

require('../config/Mail');
require('../config/dbconfig');
// require('../config/ExpressMailer');



module.exports.Signup = (req, res)=>{
    async.series({
        one: function(callback) {
            user_detail.findOne({$or:[{username:req.body.username}, {Email: req.body.email}]}, (err, data)=>{
                if(err) throw err;
                if(data){
                    const result=
                        {
                            status:true,
                            message:"user already registered",
                            error: true,
                            data:data
                        };
                    res.send(result);
                    return false;
                }
                else{
                    return callback(null, data);
                }


            });
        },
        users1: function(callback) {
            const newUser={
                username: req.body.username,
                Email:req.body.email,
                fullname:req.body.fullname,
                password:req.body.password,
                city:"",
                school:"",
                college:"",
                profession:"",
                Hobbies:"",
                profile_img:"",
                mobile_no:"",
                time1:Date.now(),
                user_id:''
            };
            const hash = md5(newUser.username);
            const User ={
                verification_token:hash,
                account_status:false
            };

            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    const User1 = new Users(User);
                    User1.save()
                        .then(data => {
                            newUser.user_id=data._id;

                            new user_detail(newUser).save()

                                .then(user12 => {

                                    const defaultFollow={
                                        user_id:user12._id,
                                        username:user12.username,
                                        follower_id:user12._id,
                                        follow_time:Date.now()
                                    }
                                    new follow(defaultFollow).save();

                                    const emailid = newUser.Email;
                                    const name = newUser.fullname;
                                    const token = User.verification_token;
                                    const link1 = "http://ankit-intern.hestalabs.com/auth/"+token
                                    const message=`<div>
                                                    <p>hello mr. ${name}</p>
                                                    <a href=${link1}>Click here to activate account</a>
                                                </div>`
                                    sendMail(emailid, "Account verification from Hestagram", message )
                
                                    // app.mailer.send('email.ejs', {
                                    //     to: emailid,
                                    //     subject: 'Verification email from hestagram', // REQUIRED.
                                    //     name:name,
                                    //     token:token

                                    // }, function (err) {
                                    //     if (err) {
                                    //         // handle error
                                    //         console.log(err);

                                    //     }
                                    //     console.log('email sent')
                                    // });

                                    

                                    const data={
                                        status:true,
                                        error:false,
                                        message:"User data added",
                                        data:user12
                                    }
                                    res.send(data)
                                })
                                .catch(err => {
                                    console.log(err);

                                })
                        })
                });

            })
        }
    });

};

module.exports.Verification = (req, res) => {
    const token7 = req.body.token;

        Users.findOne({verification_token: token7}, (err, data) => {
            if (err) {
                console.log('wrong token');
            }

        })

            .then(verify => {
                    verify.account_status = true;
                    verify.save()
                                .then(mydata => {
                                    const verified = {
                                        status: true,
                                        message: "User verified",
                                        error: false,
                                        data: mydata
                                    };
                                    res.send(verified)
                                })

                                .catch(err => {
                                    const err1 = {
                                        status: true,
                                        message: "User not verified",
                                        error: true,
                                        data: err
                                    };
                                    res.send(err1);
                                })

            .catch(error=>{

                const err1 = {
                    status: true,
                    message: "Wrong token",
                    error: true,
                    data: error
                };
                res.send(err1);
            })

            })

};
