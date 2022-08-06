MediaModel = require('../../models/app/Media');

exports.MediaUpload = function (req, res) {
    var mediaModel = new MediaModel();
    mediaModel.uid = req.body.uid
    mediaModel.file = req.file.filename;
    mediaModel.type = req.body.type
    mediaModel.status = true
    mediaModel.save(function (err) {
        var response={}
        if (err){
            response.code=403;
            response.status=false;
            response.message="Error"
            res(err)
        }else{
            response.code=200;
            response.status=true;
            response.message= "item added successful..!!",
            res(response)
        }
    })
}

exports.MediaList = function (req, res) {
    MediaModel.find({uid:req.body.uid}).populate('uid').exec((err,result)=>{
        if (result) {
            res.json({
                status :true,
                code:200,
                data:result
            })
        }
        else {
            res.json({
                status :false,
                code:403
            })
        }
    })
};

exports.DeleteMedia = async function (req, res) {
    await MediaModel.deleteOne({ _id:req.body._id }).exec((err,result)=>{
        if (result) {
            res.json({
                status :true,
                code:200,
                message:'item delete successful..!!'
            })
        }
        else {
            res.json({
                status :false,
                code:403
            })
        }
    })
};

