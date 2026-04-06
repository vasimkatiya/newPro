const { default: mongoose } = require("mongoose");


const usersSchema = new mongoose.Schema({
    username :{
        type:String,
        required : true,
        minlength:3,
        unique:true
    },
    password :{
        type:String,
        required : true,
        minlength : 6,
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
    }
});

const userModel = mongoose.model("users",usersSchema);

module.exports = userModel;