FavouriteModel = require('../../models/app/Favourite');

exports.AddFavourite = function (req, res) {
    var condition = {
        $and: [
            {me:req.body.me},
            {you:req.body.you},
        ]
    }
    FavouriteModel.findOne(condition)
    .exec((err,result)=>{
        if(result === [] || result === null || result === undefined || result === {} || result === '[]' ){
            var favouriteModel = new FavouriteModel();
            favouriteModel.me = req.body.me;
            favouriteModel.you = req.body.you;
            favouriteModel.status = true
            favouriteModel.save(function (err,data) {
                if (err) {
                    res.json({
                        status :false,
                        code:403,
                    })
                }else {
                    res.json({
                        status :true,
                        code:200,
                        data:data
                    })
                }
            })
        }else{
            res.json({
                status :false,
                code:403,
                massage:'Already Added..!!',
            })
        }
    })
}

exports.DeleteFavourite = (req, res) => {
    FavouriteModel.findOne({_id:req.body._id})
    .exec(async function(err,result){
        console.log(result)
        if(result){
            await FavouriteModel.deleteOne({ _id:req.body._id }).exec((err,result)=>{
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
                status :false,
                code:403,
                message:'already deleted this item..!!'
            })
        }
    })
}

exports.isCheckedFavourite = (req, res) => {
    var condition = {
        $and: [
            {me:req.body.me},
            {you:req.body.you},
        ]
    }
    FavouriteModel.findOne(condition)
    .populate('me')
    .populate('you')
    .exec((err,result)=>{
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
}

exports.ListOfFavourite = (req, res) => {
    FavouriteModel.find({me:req.body.me})
    .populate('me')
    .populate('you')
    .exec((err,result)=>{
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
}