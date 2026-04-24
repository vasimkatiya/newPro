const { default: mongoose, model } = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});

const messageModel = mongoose.model("message",messageSchema);

module.exports = messageModel ;