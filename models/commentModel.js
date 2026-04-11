const { default: mongoose } = require("mongoose");


const commentsSchema = new mongoose.Schema({
    text :{
        type:String,
        required :true,
        mixlength : 5,
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true});

const commentModel = mongoose.model("comments",commentsSchema);

module.exports = commentModel;