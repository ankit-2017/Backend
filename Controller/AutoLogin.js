const Users = require('../models/Users');
let user_detail = require('../models/User_details')
const async = require('async');

require('../config/dbconfig');

module.exports.autoLogin=(req, res)=>{
    async.series({
        autoLogin:function (callback) {
            const token=req.body.token;
            Users.findOne({verification_token:token},(err, data)=>{
                if(err) throw err
            })
                .then(data=>{
                    user_detail.findOne({user_id:data.id},(err, data1)=>{
                        if(err) throw err
                        const verifiedUser={
                            status:true,
                            error:false,
                            message:'user verified',
                            data:data,
                            userData:data1
                        }
                        res.send(verifiedUser);
                    })
                })
                .catch(error=>{
                    console.log('user not verified')
                })
        }
    })
}