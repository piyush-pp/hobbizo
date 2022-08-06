var mongoose = require("mongoose");
const { db } = require('../../../models/app/chat/Chat');

ChatModel = require('../../../models/app/chat/Chat');
RoomModel = require('../../../models/app/chat/Room');
MessageModel = require('../../../models/app/chat/Message');

const createChat = (req,res,room)=>{
    var condition = {
        $and: [
            {me:req.body.me},
            {you:req.body.you},
        ]
    }
    ChatModel.findOne(condition)
    .exec((err,result) => {
        if (result === [] || result === null || result === undefined || result === {} || result === '[]'){
            var chatModel = new ChatModel();
            chatModel.me = req.body.me;
            chatModel.you = req.body.you;
            chatModel.room = room._id;
            chatModel.status = true;
            chatModel.save((err,result)=> {
                if(err){
                    res.json({
                        code:403,
                        status :false,
                        error:err
                    });
                }else{
                    var chatModel = new ChatModel();
                    chatModel.me = req.body.you;
                    chatModel.you = req.body.me;
                    chatModel.room = room._id;
                    chatModel.status = true;
                    chatModel.save((err,result)=> {
                        if(err){
                            res.json({
                                code:403,
                                status :false,
                                error:err
                            });
                        }else{
                            db.collection('chats').findOneAndUpdate(
                                {_id: new mongoose.mongo.ObjectID(result._id)},    
                                {$set: {updated_at: new Date()}},  
                                { new: true }, 
                                (err,result) => {
                                    if(err){
                                        res.json({
                                            code:403,
                                            status :false
                                        })
                                    }else{
                                        res.json({
                                            code:200,
                                            status :true
                                        });  
                                    }
                                }
                            );
                        }
                    }) 
                }
            })
        }else{
            db.collection('chats').findOneAndUpdate(
                {_id: new mongoose.mongo.ObjectID(result._id)},    
                {$set: {updated_at: new Date()}},  
                { new: true }, 
                (err,result) => {
                    if(err){
                        res.json({
                            code:403,
                            status :false
                        })
                    }else{
                        res.json({
                            code:200,
                            status :true
                        });  
                    }
                }
            );
        }
    }) 
}

const updateChat = (res,req,message,result)=>{
    db.collection('rooms').findOneAndUpdate(
        {_id: new mongoose.mongo.ObjectID(result._id)},    
        { $push: {chat:message._id},$set: {updated_at: new Date()} },  
        { new: true }, 
        (err,result) => {
            if(err){
                res.json({
                    code:403,
                    status :false
                })
            }else{
                createChat(req,res,result.value._id)
            }
        }
    );
}

exports.Chat = function (req, res) {
    var messageModel = new MessageModel();
    messageModel.me = req.body.me;
    messageModel.you = req.body.you;
    messageModel.message = req.body.message
    messageModel.content_type = req.body.content_type
    messageModel.status = true;
    messageModel.save(function (err,message) {
        if (err) {
            res.json({
                status :false,
                code:403,
                error:err
            })
        }else {
            RoomModel.findOne({room_id:req.body.me+req.body.you})
            .exec((err,result) => {
                if (result === [] || result === null || result === undefined || result === {} || result === '[]'){
                    RoomModel.findOne({room_id:req.body.you+req.body.me})
                    .exec((err,result) => {
                        if (result === [] || result === null || result === undefined || result === {} || result === '[]'){
                            var roomModel = new RoomModel();
                            roomModel.room_id = req.body.me+req.body.you;
                            roomModel.chat = message._id;
                            roomModel.status = true;
                            roomModel.save((err,room)=> {
                                if (err){
                                    res.json({
                                        code:403,
                                        status :false,
                                        error:err
                                    });
                                }else{
                                    createChat(req,res,room)
                                }
                            })
                        }else{
                            updateChat(res,req,message,result)
                        }
                    })
                }else{
                    updateChat(res,req,message,result)
                }
            })
        }
    })
}

exports.ChatRoom = (req, res) => {
    RoomModel.findOne({room_id:req.body.me+req.body.you})
    .populate({
        path: 'chat',
        populate: {
            path: 'me',
        }
    })
    .populate({
        path: 'chat',
        populate: {
            path: 'you',
        }
    })
    .exec((err,result)=>{
        if (result === [] || result === null || result === undefined || result === {} || result === '[]'){
            RoomModel.findOne({room_id:req.body.you+req.body.me})
            .populate({
                path: 'chat',
                populate: {
                    path: 'me',
                }
            })
            .populate({
                path: 'chat',
                populate: {
                    path: 'you',
                }
            })
            .exec((err,result)=>{
                if (result === [] || result === null || result === undefined || result === {} || result === '[]'){
                    res.json({
                        status :false,
                        code:403
                    });  
                }else{
                    res.json({
                        status :true,
                        code:200,
                        data : result
                    });   
                }
            }) 
        }else{
            res.json({
                status :true,
                code:200,
                data : result
            });   
        }
    })
};

exports.ChatList = (req, res) => {
    ChatModel.find({me:req.body.me})
    .populate('me')
    .populate('you')
    .populate('room')
    .populate({
        path: 'room',
        populate: {
            path: 'chat',
            populate: {
                path: 'me' 
            }
        }
    })
    .populate({
        path: 'room',
        populate: {
            path: 'chat',
            populate: {
                path: 'you' 
            }
        }
    })
    .exec((err,result)=>{
        if (result === [] || result === null || result === undefined || result === {} || result === '[]'){
            res.json({
                status :false,
                code:403,
                error:err
            });  
        }else{
            const sort = result.sort((a, b) => b.updated_at - a.updated_at)
            res.json({
                status :true,
                code:200,
                data : sort
            });   
        }
    }) 
};







