const async = require('async');
const user_detail = require('../models/User_details')
const post = require('../models/posts');
const follow = require('../models/followers')

const Users = require('../models/Users');

require('../config/dbconfig');


module.exports.ShowImage=(req, res)=>{
  async.series({
      Image:function (callback) {
          console.log('token', req.headers['token'])
          console.log(req.params.id);

          follow.aggregate([
                  {
                      $match:{user_id: req.params.id}
                  },
                  {
                      $lookup:{
                          from:"posts",
                          localField:"username",
                          foreignField:"username",
                          as:"postData"
                      }
                  },
                  {
                      $unwind:"$postData"
                  },
                  {
                      $lookup:{
                          from:"user_details",
                          localField:"username",
                          foreignField:"username",
                          as:"secondData"
                      }
                  },
                  {
                      $unwind:"$secondData"
                  },
                  {$sort:{"postData.post_time":-1}}
              ],

              (err, result)=>{
              if(err) throw err;
                callback(null, result)



          }).sort({post_time: -1})

      },
      valid1:function (callback) {
          try {

              Users.findOne({verification_token: req.headers['token']}, (err, data) => {
                  if (err) throw err
                  callback(null, true)
              })
          }
          catch (e) {
              callback(e, false)
          }
      }
  }, (err, finalData)=>{
      const imgData={
          status:true,
          message:"file fetch",
          error:false,
          data:finalData.Image,
          token:finalData.valid1
      };


      res.send(imgData);
  })
};


module.exports.ShowUserImage=(req, res)=>{
    async.series({
        Data:function (callback) {
            console.log(req.params.id)
            post.find({
                user_id:req.params.id
            },(err, Images)=>{
                if(err) throw err
                const mydata={
                    status:true,
                    error:false,
                    message:"get user posts",
                    data:Images
                }
                res.send(mydata);
            })

        }
    })
}

module.exports.ShowData=(req, res)=>{
    async.series({
        Show:function (callback) {
            try {
                const udata = req.body.fid;
                console.log("user id",udata);
                user_detail.findOne({_id: udata}, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        const result = {
                            data: data
                        };
                        res.send(result.data);
                    }
                })
            }
            catch (error) {
                console.log("something wrong");
            }
        }
    })
};

module.exports.getUserDetail=(req, res)=>{
    async.series({
        userDetail:function (callback) {
            try {
                user_detail.findOne({username:req.body.username}, (err, uData)=>{
                    if(err) throw err;
                    const Data1={
                        status:true,
                        error:false,
                        message:'get user Detail',
                        data:uData
                    };
                    res.send(Data1);
                })
            }
            catch (error) {
                console.log(error);
            }
        }
    })
}