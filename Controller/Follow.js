const async = require('async');
let user_detail = require('../models/User_details')
const follow = require('../models/followers');

require('../config/dbconfig');


module.exports.Follow=(req, res)=>{
    async.series({
        follow1:function (callback) {
            try{
                user_detail.findOne({_id:req.body.fid},(err, data)=>{
                    if(err) throw err
                })
                    .then(data1=>{
                        const followdata={
                            user_id:req.body.userid,
                            username:data1.username,
                            follower_id:req.body.fid,
                            follow_time:Date.now()
                        };
                        // console.log(followdata);
                        new follow(followdata).save()
                            .then(savedata=>{
                                const result={
                                    status:true,
                                    message:"for following",
                                    error:false,
                                    data:savedata
                                };
                                res.send(result);
                            })
                            .catch(error=>{
                                const err={
                                    status:true,
                                    message:"already following or error",
                                    error:true,
                                    data:error
                                };
                                res.send(err);
                            })
                    })
            }
            catch(error){

            }

        }


    })
};
module.exports.UnFollow=(req, res)=>{
    async.series({

        unfollow:function(callback){
            console.log('user_id', req.body.userid)
            console.log('follower_id', req.body.fid)
            try {

                follow.remove({$and:[{user_id: req.body.userid}, {follower_id: req.body.fid}]}
                    ,
                    (err, result) => {
                        if (err) throw err

                            const data1 = {
                                status: true,
                                message: "Unfollow",
                                error: false,
                                data: result
                            };
                            res.send(data1)

                    })
            }
            catch (e) {
                console.log('not unfollow')
            }
        }
    })
}

module.exports.Follower=(req, res)=>{
    async.series({

        follower:function(callback){
            try {

                follow.aggregate([
                    {
                        $match: {
                            $and: [
                                {follower_id: req.body.userid},
                                {user_id: {$ne: req.body.userid}}
                            ]
                        }

                    }

                ],
                    (err, result) => {
                        if (err) throw err



                    })
                    .then(data=>{
                        const following_id=[]
                        data.map((item, i)=>{
                            following_id.push(item.user_id)
                        })
                        user_detail.find({_id:{$in: following_id}},(err, detail)=>{
                            if(err) throw err
                            const data1 = {
                                status: true,
                                message: "follower data",
                                error: false,
                                FollowerData:detail,
                                data: detail.length
                            };
                            res.send(data1)
                        })
                    })
                    .catch(error=>{
                        console.log('data not fetched')
                    })
            }
            catch (e) {
                console.log('not get data')
            }
        }
    })
}

module.exports.CheckFollow=(req, res)=>{
  async.series({
      check:function(callback){
          follow.findOne({$and:[{user_id:req.body.userid}, {follower_id: req.body.following_id}]}, (err, result)=>{
              if(err){
                  const err1={
                      status:true,
                      message:"not following",
                      error:false
                  };
                  res.send(err1)
              }
              else{
                  const data1={
                      status:true,
                      message:"already following",
                      error:true,
                      data:result
                  };
                  res.send(data1)
              }
          })
      }
  })
};

module.exports.getFollowing=(req, res)=>{
    async.series({
        count:function (callback) {
            follow.aggregate([
                {
                    $match: {
                        $and:
                            [
                                {user_id: req.body.userid},
                                {follower_id: {$ne: req.body.userid}}
                            ]

                    }
                },
                {
                    $lookup:{
                        from:"user_details",
                        localField:"username",
                        foreignField:"username",
                        as:"data"
                    }
                },
                {$unwind:"$data"}

               ],(err, result)=>{
                if(err) throw err;
                const data={
                    status:true,
                    message:"following",
                    error:false,
                    data:result,
                    number:result.length
                };
                res.send(data);
            })
        }
    })
}
