const async = require('async');
const bcrypt = require('bcryptjs');

const Users = require('../models/Users');
const user_detail = require('../models/User_details')


require('../config/dbconfig');

module.exports.Login = (req, res)=>{
  async.series({
      Login16:function (callback) {
          try {
              let username = req.body.username;
              let password1 = req.body.password;
              user_detail.findOne({$or:[{username: username }, {Email: username}]}, (err, data) => {
                  err?console.log("error"):null;
                                try {
                                    const password = data.password;
                                    const username = data.username;


                                    bcrypt.compare(password1, password, (err, match) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            Users.findOne({_id:data.user_id}, (err, result)=>{
                                                if(err) throw err;
                                                console.log("account status",result);
                                                if(result.account_status===true){
                                                    const data1 = {
                                                        status: true,
                                                        message: "user verified",
                                                        error: false,
                                                        data: match,
                                                        tokenData:result,
                                                        data2:data,
                                                        verify:true

                                                    };
                                                    res.send(data1);
                                                }
                                                else{
                                                    const data2 = {
                                                        status: true,
                                                        message: "user not verified",
                                                        error: true,
                                                        data: match,
                                                        verify:false

                                                    };
                                                    res.send(data2);
                                                }

                                            })
                                        }
                                    })
                                }
                                catch (e) {
                                    console.log('error handled in try');
                                    const userError={
                                        status:true,
                                        message:"user not found",
                                        error:true,
                                    };
                                    res.send(userError);
                                }

              })
          }
          catch(error){
              const data1 = {
                  status: true,
                  message: "user not verified",
                  error: true,


              };
              res.send(data1);
          }
      }
  })
};