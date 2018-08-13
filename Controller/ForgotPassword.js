const async = require('async');
const bcrypt = require('bcryptjs');

let user_detail = require('../models/User_details');
const Users = require('../models/Users');

require('../config/Mail');
require('../config/dbconfig');

module.exports.Forgot = (req, res) =>{
     async.series({

         forgot4:function (callback) {
             const data8= req.body.Femail;
             console.log("user email",data8);
             try {
                 user_detail.findOne({Email: data8}, (err, result)=>{
                     if(err){
                         console.log("Email id not registered");
                         return false;
                     }
                 })
                     .then(data => {
                            try {
                                Users.findOne({_id:data.user_id},(err, token)=> {
                                    if (err) throw err
                                    const emailId = data.Email
                                    const newToken= token.verification_token
                                    const name = data.fullname;
                                    const link1 = "http://ankit-intern.hestalabs.com/passwordReset/" + newToken
                                    const message = '<p>' + '<h3>hello Mr. ' + name + '</h3>' +
                                        '<h3>This is password reset link from Hestagram</h3>' +
                                        '<a href=' + link1 + '>Click here to reset password</a>' +
                                        ' </p>';
                                    sendMail(emailId, "password reset mail from Hestagram", message)

                                    const results = {
                                        status: true,
                                        message: "mail send",
                                        error: false,
                                        data: []
                                    };
                                    res.send(results);
                                })

                            }
                            catch (error) {
                                const Error_data1={
                                    status:true,
                                    message:"Email id not fetched",
                                    error:true
                                };
                                res.send(Error_data1);
                            }
                     })
             }
             catch (error) {
                 console.log("Email not correct");
                 const Error_data={
                     status:true,
                     message:"Token not registered",
                     error:false

                 };
                 res.send(Error_data);
             }
         }
     })
};

module.exports.PasswordReset=(req, res) =>{
    async.series({
        reset:function (callback) {
            const newpas = req.body.newpas;
            const Token = req.body.token;

            Users.findOne({verification_token:Token},(err, TokenData)=>{
                if(err) throw err
            })
                .then(result1=> {
                    const uid = result1.id;
                    user_detail.findOne({user_id: uid}, (err, Data) => {
                        if(err) throw err;

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newpas, salt, (err, hash) => {

                                user_detail.updateOne(
                                    {user_id: Data.user_id},
                                    {$set: {password: hash}}, (err, result) => {
                                        if (err) {
                                            console.log("password not set")
                                        }
                                        else {
                                            const u_data =
                                                {
                                                    status: true,
                                                    message: "password setter API",
                                                    error: false,
                                                    data: result

                                                };
                                            res.send(u_data);
                                        }

                                    });
                            })
                        })
                    })

                        // }
                    // })
                })
        }
    })
};

module.exports.ChangePassword=(req, res)=>{
    async.series({
        change:function (callback) {
            const old= req.body.oldpas;
            const newpas = req.body.newpas;
            const cpas = req.body.cpas;
            const username=req.body.username;
            user_detail.findOne({username:req.body.username}, (err, result)=>{
                if(err) throw err;

            })
                .then(data2=>{

                    const password= data2.password;

                        bcrypt.compare(old, password, (err, match) => {
                            if (err) {
                                console.log('old password not correct');
                            }
                            if(match===true) {
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(newpas, salt, (err, hash) => {
                                        user_detail.updateOne(
                                            {username: username},
                                            {$set: {password: hash}}, (err, update) => {
                                                if (err) {
                                                    console.log('password not updated')
                                                }
                                                else {
                                                    const data3 = {
                                                        status: true,
                                                        error: false,
                                                        message: 'password updated successfully',
                                                        data: update,
                                                        matchStatus:match
                                                    };
                                                    res.send(data3);
                                                }
                                            }
                                        )
                                    })
                                })
                            }
                            else {
                                const data5={
                                    status:true,
                                    error:true,
                                    message:'old password not correct',
                                    matchStatus:match
                                }
                                res.send(data5);
                            }
                        })

                })


        }
    })
}