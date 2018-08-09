const async = require('async');
const multer  = require('multer');
const path = require('path')

let user_detail = require('../models/User_details')
let post = require('../models/posts');

require('../config/Mail');
require('../config/dbconfig');


const storage       = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/assets');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
});

const ProfilePic       = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/assets/profile');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
});


module.exports.Posts=(req, res)=>{
            let upload = multer({ storage : storage}).any();

            async.series({
                upload:function(callback) {
                    upload(req, res, (err) => {
                        const img=[];

                        req.files.map((item, i)=>{
                            img.push(item.filename);
                        })
                        console.log('images', img)
                        const postData={
                            images:img,
                            caption:req.body.caption,
                            hashtag:req.body.tag,
                            location:req.body.location,
                            user_id:req.body.userid,
                            username:req.body.username,
                            post_time:Date.now()
                        };

                        new post(postData).save()
                            .then(postData=> {
                                post.find({user_id:req.body.userid}, (err, result)=>{
                                    if(err) throw err;
                                    res.redirect('/api/ShowImage/'+req.body.userid)
                                })
                            })
                            .catch(error=>{
                               res.send(error);
                            });
                    });

                }
            });

};

module.exports.SaveProfilePic=(req, res)=>{
    let upload1 = multer({ storage : ProfilePic}).single('Pic');
    async.series({
        profile:function (callback) {
            upload1(req, res, (err)=>{
                console.log('file name', req.file.filename);
                user_detail.findOne({username:req.body.username},(err, user1)=>{
                    if(err) throw err;

                })
                    .then(user2=>{
                        user2.profile_img=req.file.filename;
                        user2.save();
                        const mydata={
                            status:true,
                            error:false,
                            message:'profile picture changed',
                            Picdata:user2
                        }
                        res.send(mydata);
                    })
                    .catch(error=>{
                        console.log('error', error);
                    })

            })
        }
    })
}
