// const mongoose = require('mongoose');
// const async = require('async');
// require('../config/dbconfig');
// const path = require('path');
// const bcrypt = require('bcryptjs');
//
//
// require('../Database/schema/followers');
// require('../models/User_details');
// require('../models/posts');
// require('../Database/schema/Schools');
// const follow = mongoose.model('followers');
// const user_detail = mongoose.model('User_details');
// const post = mongoose.model('posts');
// const school=mongoose.model('Schools');
//
//
// module.exports.Search=(req, res)=>{
//     async.series({
//         fetchData:function (callback) {
//             try {
//                 const sdata = req.body.searchData;
//                 const username=req.body.username;
//                 user_detail.find({$and:[
//                     {username: new RegExp('^' + sdata, "i")},
//                         {username:{$not:{$eq:username}}}
//                 ]
//                     }, (err, data) => {
//                     if (err) {
//                         console.log('error while fetching data');
//                     }
//                     else {
//                         const search ={
//                             status:true,
//                             error:false,
//                             message:'search result',
//                             data:data
//                         };
//
//                         res.send(search.data);
//
//                     }
//                 })
//             }
//             catch(error){
//                 console.log('no result found');
//             }
//         }
//     })
// };
//
// module.exports.ShowData=(req, res)=>{
//     async.series({
//         Show:function (callback) {
//             try {
//                 const udata = req.body.fid;
//                 console.log("user id",udata);
//                 user_detail.findOne({_id: udata}, (err, data) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         const result = {
//                             data: data
//                         };
//                         res.send(result.data);
//                     }
//                 })
//             }
//             catch (error) {
//                 console.log("something wrong");
//             }
//         }
//     })
// };
// module.exports.Follow=(req, res)=>{
//     async.series({
//         follow1:function (callback) {
//             try{
//                 user_detail.findOne({_id:req.body.fid},(err, data)=>{
//                     if(err) throw err
//                 })
//                     .then(data1=>{
//                         const followdata={
//                             user_id:req.body.userid,
//                             username:data1.username,
//                             follower_id:req.body.fid,
//                             follow_time:Date.now()
//                         };
//                         // console.log(followdata);
//                         new follow(followdata).save()
//                             .then(savedata=>{
//                                 const result={
//                                     status:true,
//                                     message:"for following",
//                                     error:false,
//                                     data:savedata
//                                 };
//                                 res.send(result);
//                             })
//                             .catch(error=>{
//                                 const err={
//                                     status:true,
//                                     message:"already following or error",
//                                     error:true,
//                                     data:error
//                                 };
//                                 res.send(err);
//                             })
//                     })
//             }
//             catch(error){
//
//             }
//
//         },
//         follow2:function (callback) {
//             try {
//                 const uid = data.username;
//                 console.log("user id",uid);
//                 callback(null, uid);
//
//             }
//             catch(error){
//                 console.log("id not found")
//             }
//
//         }
//
//
//     })
// };
// module.exports.CheckFollow=(req, res)=>{
//   async.series({
//       check:function(callback){
//           follow.findOne({$and:[{user_id:req.body.userid}, {follower_id: req.body.following_id}]}, (err, result)=>{
//               if(err){
//                   const err1={
//                       status:true,
//                       message:"not following",
//                       error:false
//                   };
//                   res.send(err1)
//               }
//               else{
//                   const data1={
//                       status:true,
//                       message:"already following",
//                       error:true,
//                       data:result
//                   };
//                   res.send(data1)
//               }
//           })
//       }
//   })
// };
// module.exports.ShowUserImage=(req, res)=>{
//     async.series({
//         Data:function (callback) {
//             console.log(req.params.id)
//             post.find({
//                 user_id:req.params.id
//             },(err, Images)=>{
//                 if(err) throw err
//                 const mydata={
//                     status:true,
//                     error:false,
//                     message:"get user posts",
//                     data:Images
//                 }
//                 res.send(mydata);
//             })
//
//         }
//     })
// }
// module.exports.ShowImage=(req, res)=>{
//   async.series({
//       Image:function (callback) {
//           console.log(req.params.id);
//           follow.aggregate([
//                   {
//                       $match:{user_id: req.params.id}
//                   },
//                   {
//                       $lookup:{
//                           from:"posts",
//                           localField:"username",
//                           foreignField:"username",
//                           as:"postData"
//                       }
//                   },
//                   {
//                       $unwind:"$postData"
//                   },
//                   {
//                       $lookup:{
//                           from:"user_details",
//                           localField:"username",
//                           foreignField:"username",
//                           as:"secondData"
//                       }
//                   },
//                   {
//                       $unwind:"$secondData"
//                   },
//                   {$sort:{follow_time:-1}}
//               ],
//
//               (err, result)=>{
//               if(err) throw err;
//
//               const imgData={
//                   status:true,
//                   message:"file fetch",
//                   error:false,
//                   data:result,
//               };
//
//               res.send(imgData);
//
//
//           }).sort({post_time: -1})
//               .then(result=>{
//
//               })
//               .catch(error=>{
//                   console.log("error to show images", error);
//               })
//       }
//   })
// };
// module.exports.CountFollowing=(req, res)=>{
//     async.series({
//         count:function (callback) {
//             console.log("userid",req.body.userid);
//             follow.find({user_id:req.body.userid},(err, result)=>{
//                 if(err) throw err;
//                 const data={
//                     status:true,
//                     message:"following",
//                     error:false,
//                     data3:result,
//                     number:result.length
//                 };
//                 res.send(data);
//             })
//         }
//     })
// }
//
// module.exports.AdminLogin=(req, res)=>{
//     async.series({
//         Admin:function (callback) {
//             console.log('username', req.body.username);
//             console.log('password', req.body.password);
//             user_detail.findOne({$and:[{username:req.body.username}, {password:req.body.password}]},(err, data)=>{
//                 if(err) throw err;
//                 const result={
//                     status:true,
//                     message:"Admin login",
//                     error:false,
//                     loginData:data
//                 };
//                 res.send(result);
//             })
//         }
//     })
// };
//
// module.exports.AdminData=(req, res)=>{
//     async.series({
//         Admin:function (callback) {
//             user_detail.find({},(err, data)=>{
//                 if(err) throw err;
//                 const result={
//                     status:true,
//                     message:"Admin login",
//                     error:false,
//                     AdminData:data
//                 };
//                 res.send(result.AdminData);
//             })
//         }
//     })
// };
// module.exports.AdminFollow=(req, res)=>{
//     async.series({
//         Admin1:function (callback) {
//             follow.find({user_id:req.body.userid},(err, data)=>{
//                 if(err) throw err;
//                 const result={
//                     status:true,
//                     message:"follow data",
//                     error:false,
//                     followData:data
//                 };
//                 res.send(result.followData);
//             })
//         }
//     })
// };
//
// module.exports.Suggestion=(req, res)=>{
//     async.series({
//         suggestion:function (callback) {
//
//
//             user_detail.findOne({username:req.body.username},(err, data)=>{
//                 if(err) throw err;
//             })
//
//                 .then(data=> {
//                     data.city=req.body.city;
//                     data.school=req.body.school1;
//                     data.college=req.body.collage;
//                     data.profession=req.body.prof;
//                     data.Hobbies=req.body.hobbies;
//
//                     data.save()
//
//                         .then(result => {
//                             const updateData = {
//                                 status: true,
//                                 message: "data updated",
//                                 error: false,
//                                 userdata: result,
//                                 data: data,
//                             };
//                             res.send(updateData);
//                         })
//                         .catch(error => {
//                             console.log('data not updated');
//                         })
//
//                 })
//
//                 .catch(error=>{
//                     console.log("record not found");
//                 })
//
//
//         }
//
//     })
// };
// module.exports.UserSuggestion=(req, res)=> {
//     async.series({
//         userInfo: function (callback) {
//             console.log('username', req.body.username);
//             user_detail.findOne({username: req.body.username}, (err, result) => {
//                 if (err) throw err;
//             })
//                 .then(userData => {
//                     follow.aggregate([
//
//                             {
//                                 $match:
//                                     {
//                                         $and:[
//                                             {user_id:userData.id},
//                                             {follower_id:{$ne:userData.id}}
//                                         ]
//
//                                     }
//
//                             }
//                         ],
//
//                         (err, result) => {
//                             if (err) throw err;
//                         })
//                         .then(result=>{
//                             const newarray=[]
//                             result.map((item,i)=>{
//                                 newarray.push(item.follower_id)
//                             })
//                             console.log('follower id', newarray);
//                             user_detail.find({
//                                                 _id:{$nin:newarray},
//
//                                                 username:{$ne:userData.username},
//
//                                                 $or: [
//                                                         {Hobbies: userData.Hobbies},
//                                                         {city: userData.city},
//                                                         {school: userData.school},
//                                                         {profession: userData.profession},
//                                                         {college: userData.college}
//
//                                                     ]
//                                     },
//                                 (err, newData)=>{
//                                 if(err) throw err
//                                     const suggest = {
//                                         status: true,
//                                         error: false,
//                                         message: "suggestion found",
//                                         data: newData
//                                     };
//                                     res.send(suggest);
//                             })
//                         })
//                         .catch(error=>{
//                             console.log('suggestion not found')
//                         })
//
//
//                 })
//                 .catch(error => {
//                     console.log('suggestion data not found');
//                 })
//         }
//         // follow:function (callback) {
//         //     user_detail.findOne({username: req.body.username}, (err, result) => {
//         //         if (err) throw err;
//         //     })
//         //         .then(result1=>{
//         //             follow.find({
//         //                 user_id:result1._id,
//         //                 follower_id:{$ne:result1._id}
//         //             },(err, followResult)=>{
//         //                 if(err) throw err;
//         //                 callback(null,followResult)
//         //             })
//         //         })
//         //         .catch(error => {
//         //             console.log('follow data not found');
//         //         })
//         //
//         //
//         // }
//
// // },(err, finalData)=>{
//         // console.log('userData', finalData.userInfo)
//         // console.log('followData', finalData.follow)
//         // const arr=[]
//         // let isFound=0
//         // finalData.userInfo.map((item,i)=>{
//         //     let isFound=0
//         //     finalData.follow.map((item2)=>{
//         //         if(item._id!=item2.follower_id){
//         //                 isFound=1
//         //             // console.log('matched item', item2);
//         //
//         //         }
//         //     })
//         //     console.log(isFound);
//         //     if(isFound==1){
//         //         arr.push(item)
//         //     }
//         // })
//         // let farr=finalData.follow
//         // const res1=finalData.userInfo.filter(function (n){return !this.has(n)}, new Set(farr));
//         // console.log("new",res1);
//         //
//         // // console.log('final data', arr);
//
//     })
// }
// module.exports.getUserDetail=(req, res)=>{
//     async.series({
//         userDetail:function (callback) {
//             try {
//                 user_detail.findOne({username:req.body.username}, (err, uData)=>{
//                     if(err) throw err;
//                     const Data1={
//                         status:true,
//                         error:false,
//                         message:'get user Detail',
//                         data:uData
//                     };
//                     res.send(Data1);
//                 })
//             }
//             catch (error) {
//                 console.log(error);
//             }
//         }
//     })
// }
// module.exports.EditName=(req, res)=>{
//     async.series({
//         edit:function (callback) {
//             try {
//                 user_detail.findOne({username:req.body.username}, (err, result)=>{
//                   if(err) throw err;
//
//                 })
//                     .then(result=>{
//                         result.fullname=req.body.name;
//                         result.time1=Date.now();
//                         result.save();
//
//                     })
//                     .then(AfterEdit=>{
//                         const data={
//                             status:true,
//                             error:false,
//                             message:'data edited successfully',
//                             editedData:AfterEdit
//                         }
//                         res.send(data);
//                     })
//             }
//             catch (e) {
//                 console.log('error')
//             }
//         }
//     })
// }
// module.exports.EditCity=(req, res)=>{
//     async.series({
//         edit:function (callback) {
//             try {
//                 user_detail.findOne({username:req.body.username}, (err, result)=>{
//                     if(err) throw err;
//
//                 })
//                     .then(result=>{
//                         result.city=req.body.city;
//                         result.time1=Date.now();
//                         result.save();
//
//                     })
//                     .then(AfterEdit=>{
//                         const data={
//                             status:true,
//                             error:false,
//                             message:'city edited successfully',
//                             editedData:AfterEdit
//                         }
//                         res.send(data);
//                     })
//             }
//             catch (e) {
//                 console.log('error')
//             }
//         }
//     })
// }
//
// module.exports.EditSchool=(req, res)=>{
//     async.series({
//         edit:function (callback) {
//             try {
//                 user_detail.findOne({username:req.body.username}, (err, result)=>{
//                     if(err) throw err;
//
//                 })
//                     .then(result=>{
//                         result.school=req.body.school;
//                         result.time1=Date.now();
//                         result.save();
//
//                     })
//                     .then(AfterEdit=>{
//                         const data={
//                             status:true,
//                             error:false,
//                             message:'School name edited successfully',
//                             editedData:AfterEdit
//                         }
//                         res.send(data);
//                     })
//             }
//             catch (e) {
//                 console.log('error')
//             }
//         }
//     })
// }
//
// module.exports.EditCollege=(req, res)=>{
//     async.series({
//         edit:function (callback) {
//             try {
//                 user_detail.findOne({username:req.body.username}, (err, result)=>{
//                     if(err) throw err;
//
//                 })
//                     .then(result=>{
//                         result.college=req.body.college;
//                         result.time1=Date.now();
//                         result.save();
//
//                     })
//                     .then(AfterEdit=>{
//                         const data={
//                             status:true,
//                             error:false,
//                             message:'college name edited successfully',
//                             editedData:AfterEdit
//                         }
//                         res.send(data);
//                     })
//             }
//             catch (e) {
//                 console.log('error')
//             }
//         }
//     })
// }
// module.exports.EditEmail=(req, res)=>{
//     async.series({
//         edit:function (callback) {
//             try {
//                 user_detail.findOne({username:req.body.username}, (err, result)=>{
//                     if(err) throw err;
//
//                 })
//                     .then(result=>{
//                         result.Email=req.body.email;
//                         result.time1=Date.now();
//                         result.save();
//
//                     })
//                     .then(AfterEdit=>{
//                         const data={
//                             status:true,
//                             error:false,
//                             message:'Email changed successfully',
//                             editedData:AfterEdit
//                         }
//                         res.send(data);
//                     })
//             }
//             catch (e) {
//                 console.log('error')
//             }
//         }
//     })
// }
//
// module.exports.EditMobile=(req, res)=>{
//     async.series({
//         edit:function (callback) {
//             try {
//                 user_detail.findOne({username:req.body.username}, (err, result)=>{
//                     if(err) throw err;
//
//                 })
//                     .then(result=>{
//                         result.mobile_no=req.body.mobile;
//                         result.time1=Date.now();
//                         result.save();
//
//                     })
//                     .then(AfterEdit=>{
//                         const data={
//                             status:true,
//                             error:false,
//                             message:'mobile number changed successfully',
//                             editedData:AfterEdit
//                         }
//                         res.send(data);
//                     })
//             }
//             catch (e) {
//                 console.log('error')
//             }
//         }
//     })
// }
// module.exports.ChangePassword=(req, res)=>{
//     async.series({
//         change:function (callback) {
//             const old= req.body.oldpas;
//             const newpas = req.body.newpas;
//             const cpas = req.body.cpas;
//             const username=req.body.username;
//             user_detail.findOne({username:req.body.username}, (err, result)=>{
//                 if(err) throw err;
//
//             })
//                 .then(data2=>{
//
//                     const password= data2.password;
//
//                         bcrypt.compare(old, password, (err, match) => {
//                             if (err) {
//                                 console.log('old password not correct');
//                             }
//                             if(match===true) {
//                                 bcrypt.genSalt(10, (err, salt) => {
//                                     bcrypt.hash(newpas, salt, (err, hash) => {
//                                         user_detail.updateOne(
//                                             {username: username},
//                                             {$set: {password: hash}}, (err, update) => {
//                                                 if (err) {
//                                                     console.log('password not updated')
//                                                 }
//                                                 else {
//                                                     const data3 = {
//                                                         status: true,
//                                                         error: false,
//                                                         message: 'password updated successfully',
//                                                         data: update,
//                                                         matchStatus:match
//                                                     };
//                                                     res.send(data3);
//                                                 }
//                                             }
//                                         )
//                                     })
//                                 })
//                             }
//                             else {
//                                 const data5={
//                                     status:true,
//                                     error:true,
//                                     message:'old password not correct',
//                                     matchStatus:match
//                                 }
//                                 res.send(data5);
//                             }
//                         })
//
//                 })
//
//
//         }
//     })
// }
// module.exports.Notification=(req, res)=>{
//     async.series({
//         followData1:function (callback) {
//             userId=req.body.user_id;
//             follow.find({
//                 $and:[
//                     {follower_id:userId},
//                     {user_id:{$ne:userId}}
//                 ]
//
//             },(err, result)=>{
//                 if(err) throw err;
//                 callback(null, result)
//             })
//         },
//         UserData6:function (callback) {
//             user_detail.find({},(err, result3)=>{
//                 callback(null,result3);
//             })
//
//         }
//     },(err, AllData)=>{
//         const finalArray=[];
//         AllData.followData1.map((item, i)=>{
//             AllData.UserData6.map((item1, i1)=>{
//                 if(item.user_id==item1._id){
//                     // console.log('detail', item1.fullname)
//                     finalArray.push({Name:item1.fullname, id:item1._id });
//
//                 }
//                 else
//                 {
//                     console.log('no result found');
//                 }
//             })
//         })
//         const mydata={
//             status:true,
//             error:false,
//             message:'notification data',
//             notificationData:finalArray
//         }
//         res.send(mydata);
//     })
//
// }
// module.exports.hashtagSearch=(req, res)=>{
//     const hashData=req.body.hashData;
//     post.find({
//         hashtag:new RegExp('^'+hashData,'i')
//
//     },{hashtag:1, user_id:1 },(err, Data)=>{
//         if(err) throw err;
//         const hash={
//             status:true,
//             error:false,
//             message:'hashtag result',
//             hashtag:Data
//         }
//         res.send(hash)
//     }).limit(2)
// }
//
