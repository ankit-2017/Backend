const async = require('async');
const user_detail = require('../models/User_details')
const follow = require('../models/followers');


require('../config/dbconfig');

module.exports.Suggestion=(req, res)=>{
    async.series({
        suggestion:function (callback) {


            user_detail.findOne({username:req.body.username},(err, data)=>{
                if(err) throw err;
            })

                .then(data=> {
                    data.city=req.body.city;
                    data.school=req.body.school1;
                    data.college=req.body.collage;
                    data.profession=req.body.prof;
                    data.Hobbies=req.body.hobbies;

                    data.save()

                        .then(result => {
                            const updateData = {
                                status: true,
                                message: "data updated",
                                error: false,
                                userdata: result,
                                data: data,
                            };
                            res.send(updateData);
                        })
                        .catch(error => {
                            console.log('data not updated');
                        })

                })

                .catch(error=>{
                    console.log("record not found");
                })


        }

    })
};
module.exports.UserSuggestion=(req, res)=> {
    async.series({
        userInfo: function (callback) {
            user_detail.findOne({username: req.body.username}, (err, result) => {
                if (err) throw err;
            })
                .then(userData => {
                    follow.aggregate([

                            {
                                $match:
                                    {
                                        $and:[
                                            {user_id:userData.id},
                                            {follower_id:{$ne:userData.id}}
                                        ]

                                    }

                            }
                        ],

                        (err, result) => {
                            if (err) throw err;
                        })
                        .then(result=>{
                            const newarray=[]
                            result.map((item,i)=>{
                                newarray.push(item.follower_id)
                            })
                            console.log('follower id', newarray)
                            user_detail.find({
                                                _id:{$nin:newarray},

                                                username:{$ne:userData.username},

                                                $or: [
                                                        {Hobbies: userData.Hobbies},
                                                        {city: userData.city},
                                                        {school: userData.school},
                                                        {profession: userData.profession},
                                                        {college: userData.college}

                                                    ]
                                    },
                                (err, newData)=>{
                                if(err) throw err
                                    const suggest = {
                                        status: true,
                                        error: false,
                                        message: "suggestion found",
                                        data: newData
                                    };
                                    res.send(suggest);
                            })
                        })
                        .catch(error=>{
                            console.log('suggestion not found')
                        })


                })
                .catch(error => {
                    console.log('suggestion data not found');
                })
        }

    })
}

module.exports.Notification=(req, res)=>{
    async.series({
        followData1:function (callback) {
            const userId=req.body.user_id;
            follow.find({
                $and:[
                    {follower_id:userId},
                    {user_id:{$ne:userId}}
                ]

            },(err, result)=>{
                if(err) throw err;
                callback(null, result)
            })
        },
        UserData6:function (callback) {
            user_detail.find({},(err, result3)=>{
                callback(null,result3);
            })

        }
    },(err, AllData)=>{
        const finalArray=[];
        AllData.followData1.map((item, i)=>{
            AllData.UserData6.map((item1, i1)=>{
                if(item.user_id==item1._id){
                    // console.log('detail', item1.fullname)
                    finalArray.push({Name:item1.fullname, id:item1._id });

                }
                else
                {
                    console.log('no result found');
                }
            })
        })
        const mydata={
            status:true,
            error:false,
            message:'notification data',
            notificationData:finalArray
        }
        res.send(mydata);
    })

}