const async = require('async');
const user_detail = require('../models/User_details')


require('../config/dbconfig');

module.exports.EditName=(req, res)=>{
    async.series({
        edit:function (callback) {
            try {
                user_detail.findOne({username:req.body.username}, (err, result)=>{
                  if(err) throw err;

                })
                    .then(result=>{
                        result.fullname=req.body.name;
                        result.time1=Date.now();
                        result.save();

                    })
                    .then(AfterEdit=>{
                        const data={
                            status:true,
                            error:false,
                            message:'data edited successfully',
                            editedData:AfterEdit
                        }
                        res.send(data);
                    })
            }
            catch (e) {
                console.log('error')
            }
        }
    })
}
module.exports.EditCity=(req, res)=>{
    async.series({
        edit:function (callback) {
            try {
                user_detail.findOne({username:req.body.username}, (err, result)=>{
                    if(err) throw err;

                })
                    .then(result=>{
                        result.city=req.body.city;
                        result.time1=Date.now();
                        result.save();

                    })
                    .then(AfterEdit=>{
                        const data={
                            status:true,
                            error:false,
                            message:'city edited successfully',
                            editedData:AfterEdit
                        }
                        res.send(data);
                    })
            }
            catch (e) {
                console.log('error')
            }
        }
    })
}

module.exports.EditSchool=(req, res)=>{
    async.series({
        edit:function (callback) {
            try {
                user_detail.findOne({username:req.body.username}, (err, result)=>{
                    if(err) throw err;

                })
                    .then(result=>{
                        result.school=req.body.school;
                        result.time1=Date.now();
                        result.save();

                    })
                    .then(AfterEdit=>{
                        const data={
                            status:true,
                            error:false,
                            message:'School name edited successfully',
                            editedData:AfterEdit
                        }
                        res.send(data);
                    })
            }
            catch (e) {
                console.log('error')
            }
        }
    })
}

module.exports.EditCollege=(req, res)=>{
    async.series({
        edit:function (callback) {
            try {
                user_detail.findOne({username:req.body.username}, (err, result)=>{
                    if(err) throw err;

                })
                    .then(result=>{
                        result.college=req.body.college;
                        result.time1=Date.now();
                        result.save();

                    })
                    .then(AfterEdit=>{
                        const data={
                            status:true,
                            error:false,
                            message:'college name edited successfully',
                            editedData:AfterEdit
                        }
                        res.send(data);
                    })
            }
            catch (e) {
                console.log('error')
            }
        }
    })
}
module.exports.EditEmail=(req, res)=>{
    async.series({
        edit:function (callback) {
            try {
                user_detail.findOne({username:req.body.username}, (err, result)=>{
                    if(err) throw err;

                })
                    .then(result=>{
                        result.Email=req.body.email;
                        result.time1=Date.now();
                        result.save();

                    })
                    .then(AfterEdit=>{
                        const data={
                            status:true,
                            error:false,
                            message:'Email changed successfully',
                            editedData:AfterEdit
                        }
                        res.send(data);
                    })
            }
            catch (e) {
                console.log('error')
            }
        }
    })
}

module.exports.EditMobile=(req, res)=>{
    async.series({
        edit:function (callback) {
            try {
                user_detail.findOne({username:req.body.username}, (err, result)=>{
                    if(err) throw err;

                })
                    .then(result=>{
                        result.mobile_no=req.body.mobile;
                        result.time1=Date.now();
                        result.save();

                    })
                    .then(AfterEdit=>{
                        const data={
                            status:true,
                            error:false,
                            message:'mobile number changed successfully',
                            editedData:AfterEdit
                        }
                        res.send(data);
                    })
            }
            catch (e) {
                console.log('error')
            }
        }
    })
}