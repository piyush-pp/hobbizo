var mongoose = require("mongoose");
UsersModel = require('../../models/app/Users')
const { db } = require('../../models/app/Users');
var ObjectId = require('mongodb').ObjectID;

var bcrypt = require('bcrypt');
var saltRounds = 10;

var jwt = require('jsonwebtoken');
var tokenelemtns = {
    "Secret":"userSecretData",
    "Life":31500000
};

const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.ValidatePhone = (req, res) => {
    UsersModel.findOne({phone:req.body.phone})
    .exec((err,result)=> {
        if(result === [] || result === null || result === undefined || result === {} || result === '[]' ){
            res.json({
                status :false,
                code:403,
            })
        }else{
            var payload = {}
            payload._id = result._id;
            payload.phone = result.phone;
            var token = jwt.sign(payload,tokenelemtns.Secret,{expiresIn:tokenelemtns.Life});
            res.json({
                status :true,
                code:200,
                message:"Login success",
                data:result,
                token:token,
            })
        }
    })
}

exports.ValidateEmail = (req, res) => {
    if(validateEmail.test(String(req.body.email).toLowerCase())==true) {
        UsersModel.findOne({email:req.body.email})
        .exec((err,result)=> {
            console.log(result)
            if(result === [] || result === null || result === undefined || result === {} || result === '[]' ){
                res.json({
                    status :false,
                    code:403,
                })
            }else{
                var payload = {}
                payload._id = result._id;
                payload.email = result.email;
                var token = jwt.sign(payload,tokenelemtns.Secret,{expiresIn:tokenelemtns.Life});
                res.json({
                    status :true,
                    code:200,
                    message:"Login success",
                    data:result,
                    token:token,
                })
            }
        })
    }else{
        res.json({
            status :false,
            code:403,
            message:"Please enter valid email address",
        })
    } 
}


exports.PhoneLogin = (req, res) => {
    UsersModel.findOne({phone:req.body.phone})
    .exec((err,result)=> {
        if(result === [] || result === null || result === undefined || result === {} || result === '[]' ){
            var usersModel = new UsersModel();
            usersModel.name = req.body.name;
            usersModel.phone = req.body.phone;
            usersModel.dialCode = req.body.dialCode;
            usersModel.gender = req.body.gender
            usersModel.date_of_birth = req.body.date_of_birth
            usersModel.hobbies = req.body.hobbies
            usersModel.latLong = req.body.latLong
            usersModel.os = req.body.os   
            usersModel.fcm_token = req.body.fcm_token
            usersModel.device_uid = req.body.device_uid
            usersModel.login_source = req.body.login_source
            usersModel.status = true
            usersModel.save(function(err,data){
                var payload = {}
                    payload._id = data._id;
                    payload.email = data.email;
                    var token = jwt.sign(payload,tokenelemtns.Secret,{expiresIn:tokenelemtns.Life});
                if (err){
                    res.json({
                        status :false,
                        code:403,
                        error:err
                    })
                }else{
                    res.json({
                        status :true,
                        code:200,
                        message:"Register Successful",
                        data:data,
                        token:token,
                    })
                }
            });
        }else{
            db.collection('users').findOneAndUpdate(
                {_id: new ObjectId(result._id)},
                {$set:req.body},
                {upsert: true},
                (err,resp) => {
                    UsersModel.findOne({phone:req.body.phone})
                    .exec((err,result)=> {
                        var payload = {}
                        payload._id = result._id;
                        payload.phone = result.phone;
                        var token = jwt.sign(payload,tokenelemtns.Secret,{expiresIn:tokenelemtns.Life});
                        if(result){
                            res.json({
                                status :true,
                                code:200,
                                message:"Login success",
                                data:result,
                                token:token,
                            })
                        }else{
                            res.json({
                                status :false,
                                code:403,
                                error:err
                            })
                        }
                    })
                }
            );
        }
    })
};


exports.SocialLogin = (req, res) => {
    if(validateEmail.test(String(req.body.email).toLowerCase())==true) {
        UsersModel.findOne({email:req.body.email})
        .exec((err,result)=> {
            if(result === [] || result === null || result === undefined || result === {} || result === '[]' ){
                var usersModel = new UsersModel();
                usersModel.name = req.body.name;
                usersModel.email = req.body.email;
                usersModel.gender = req.body.gender
                usersModel.date_of_birth = req.body.date_of_birth
                usersModel.hobbies = req.body.hobbies
                usersModel.latLong = req.body.latLong
                usersModel.os = req.body.os   
                usersModel.fcm_token = req.body.fcm_token
                usersModel.device_uid = req.body.device_uid
                usersModel.login_source = req.body.login_source
                usersModel.status = true
                usersModel.save(function(err,data){
                    var payload = {}
                        payload._id = data._id;
                        payload.email = data.email;
                        var token = jwt.sign(payload,tokenelemtns.Secret,{expiresIn:tokenelemtns.Life});
                    if (err){
                        res.json({
                            status :false,
                            code:403,
                            error:err
                        })
                    }else{
                        res.json({
                            status :true,
                            code:200,
                            message:"Register Successful",
                            data:data,
                            token:token,
                        })
                    }
                });
            }else{
                db.collection('users').findOneAndUpdate(
                    {_id: new ObjectId(result._id)},
                    {$set:req.body},
                    {upsert: true},
                    (err,resp) => {
                        UsersModel.findOne({email:req.body.email})
                        .exec((err,result)=> {
                            var payload = {}
                            payload._id = result._id;
                            payload.email = result.email;
                            var token = jwt.sign(payload,tokenelemtns.Secret,{expiresIn:tokenelemtns.Life});
                            if(result){
                                res.json({
                                    status :true,
                                    code:200,
                                    message:"Login success",
                                    data:result,
                                    token:token,
                                })
                            }else{
                                res.json({
                                    status :false,
                                    code:403,
                                    error:err
                                })
                            }
                        })
                    }
                );
            }
        })
    }else{
        res.json({
            status :false,
            code:403,
            message:"Please enter valid email address",
        })
    }
};

exports.UsersList = (req, res) => {
    UsersModel.find()
    .populate('hobbies')
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

exports.UserDetails = (req, res) => {
    UsersModel.findOne({_id:req.body._id})
    .populate('hobbies')
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
                code:403,
                status :false,
                message:"No user found",
            })
        }
    })
}

exports.UpdateLatLong = (req, res) => {
    UsersModel.findOne({_id:req.body._id},(err, result) => {
       if(result){
            db.collection('users').findOneAndUpdate(
                {_id: new ObjectId(req.body._id)},    
                { $set:{latitude:req.body.latitude,longitude:req.body.longitude,update_on:new Date()}},  
                { new: true }, 
                (err,result) => {
                    res.json({
                        code:200,
                        status :true,
                        message: "Update Successful",
                    })
                }
            );
       }else{
            res.json({
                code:403,
                status: false,
                message: "Something went wrong",
            });  
       }
       
    });  
}

exports.UpdateProfile = (req, res) => {
    UsersModel.findOne({_id:req.body._id},(err, result) => {
       if(result){
            db.collection('users').findOneAndUpdate(
                {_id: new ObjectId(req.body._id)},    
                { $set:{profile:req.file.filename,update_on:new Date()}},  
                { new: true }, 
                (err,result) => {
                    var response={}
                    if (result){
                        response.code=200;
                        response.status=true;
                        response.message= "profile update successful",
                        res(response)
                    }else{
                        response.code=403;
                        response.status=false;
                        response.message="Error"
                        res(err)
                    }
                }
            );
        }else{
            var response={}
            response.code=403;
            response.status=false;
            response.message= "Something went wrong",
            res(err)
        }
       
    }); 
}

exports.UpdateUserDetails = (req, res) => {
    db.collection('users').findOneAndUpdate(
        {_id: new mongoose.mongo.ObjectID(req.body.id)},
        {$set:req.body},
        {upsert: true,},
        (err,response) => {
            if(err){
                res.json({
                    status :false,
                    code:403,
                })
            }else{
                res.json({
                    status :true,
                    code:200,
                })
            }
        }
    );
}



