const { default: mongoose } = require("mongoose");


const postSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    url:{
        type:String,
        required : true
    },
    caption:{
        type:String,
        minlength:3,
    },
   
},{timestamps : true});



const postModel = mongoose.model("posts",postSchema);

module.exports = postModel;