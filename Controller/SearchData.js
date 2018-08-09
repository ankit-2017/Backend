const async = require('async');
let user_detail = require('../models/User_details')
let post = require('../models/posts');


require('../config/dbconfig');
module.exports.Search=(req, res)=>{
    async.series({
        fetchData:function (callback) {
            try {
                const sdata = req.body.searchData;
                const username=req.body.username;
                user_detail.find({$and:[
                    {username: new RegExp('^' + sdata, "i")},
                        {username:{$not:{$eq:username}}}
                ]
                    }, (err, data) => {
                    if (err) {
                        console.log('error while fetching data');
                    }
                    else {
                        const search ={
                            status:true,
                            error:false,
                            message:'search result',
                            data:data
                        };

                        res.send(search.data);

                    }
                })
            }
            catch(error){
                console.log('no result found');
            }
        }
    })
};

module.exports.hashtagSearch=(req, res)=>{
    const hashData=req.body.hashData;
    post.find({
        hashtag:new RegExp('^'+hashData,'i')

    },{hashtag:1, user_id:1 },(err, Data)=>{
        if(err) throw err;
        const hash={
            status:true,
            error:false,
            message:'hashtag result',
            hashtag:Data
        }
        res.send(hash)
    }).limit(2)
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
