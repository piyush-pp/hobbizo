HobbiesModel = require('../../models/app/Hobbies');

exports.AddHobbiesCategory = function (req, res) {
    var hobbiesModel = new HobbiesModel();
    hobbiesModel.name = req.body.name;
    hobbiesModel.image = req?.file?.filename;
    hobbiesModel.isParent = true
    hobbiesModel.status = true
    hobbiesModel.save(function (err) {
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

exports.HobbiesCategoryList = function (req, res) {
    HobbiesModel.find({isParent:true}).exec((err,result)=>{
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

exports.DeleteHobbies = function (req, res) {
    HobbiesModel.findOne({_id:req.body._id})
    .exec(async function(err,result){
        console.log(result)
        if(result){
            await HobbiesModel.deleteOne({ _id:req.body._id }).exec((err,result)=>{
                console.log(result)
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
        }else{
            res.json({
                status :true,
                code:200,
                message:'already deleted this item..!!'
            })
        }
    })
};

exports.AddHobbies = function (req, res) {
    var hobbiesModel = new HobbiesModel();
    hobbiesModel.name = req.body.name;
    hobbiesModel.image = req?.file?.filename;
    hobbiesModel.parent = req.body.parent;
    hobbiesModel.isParent = false
    hobbiesModel.status = true;
    hobbiesModel.save(function (err) {
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

exports.HobbiesList = function (req, res) {
    HobbiesModel.find({parent:req.body.parent}).populate('parent').exec((err,result)=>{
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