const { default: mongoose } = require("mongoose");

const followSchema = new mongoose.Schema({

    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }

},{timestamps : true});

followSchema.index({follower:1,following:1});

const followModel = mongoose.model("follows",followSchema);

module.exports = followModel ;