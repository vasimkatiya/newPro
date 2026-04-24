const { default: mongoose } = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
        },
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'message'
        }
    ]
},{timestamps:true});

const conversationModel = mongoose.model("conversation",conversationSchema);

module.exports = conversationModel;
