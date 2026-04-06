const { default: mongoose } = require("mongoose")
require('dotenv').config();

exports.connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDB connected successfully...");
}
