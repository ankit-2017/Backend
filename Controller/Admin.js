const async = require('async');
const user_detail = require('../models/User_details')
const follow = require('../models/followers')


require('../config/dbconfig');

module.exports.AdminLogin=(req, res)=>{
    async.series({
        Admin:function (callback) {
            user_detail.findOne({$and:[{username:req.body.username}, {password:req.body.password}]},(err, data)=>{
                if(err) throw err;
                const result={
                    status:true,
                    message:"Admin login",
                    error:false,
                    loginData:data
                };
                res.send(result);
            })
        }
    })
};

module.exports.AdminData=(req, res)=>{
    async.series({
        Admin:function (callback) {
            user_detail.find({},(err, data)=>{
                if(err) throw err;
                const result={
                    status:true,
                    message:"Admin login",
                    error:false,
                    AdminData:data
                };
                res.send(result.AdminData);
            })
        }
    })
};
module.exports.AdminFollow=(req, res)=>{
    async.series({
        Admin1:function (callback) {
            follow.find({user_id:req.body.userid},(err, data)=>{
                if(err) throw err;
                const result={
                    status:true,
                    message:"follow data",
                    error:false,
                    followData:data
                };
                res.send(result.followData);
            })
        }
    })
};