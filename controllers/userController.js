const followModel = require("../models/followModel");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");


exports.userController = async (req,res)=>{

    try {
        
        const userId = req.user?.id;

        if(!userId)
        {
            return res.status(400).json({
                message:"userId is undefined"
            });
        };

        const posts = await postModel.find({
            user_id:userId
        }).populate();

        const followerCount = await followModel.countDocuments({
            following:userId
        });

        const followingsCount = await followModel.countDocuments({
            follower:userId
        });

        const user = await userModel.findOne({
            _id:userId
        }).populate();

        res.status(200).json({
            message:"user profile is successfully displayed",
            user,
            followerCount,
            followingsCount,
            posts,
        });


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message:"internal server error"
        })
    }

}


exports.userProfileController = async (req,res)=>{
    try {
        
        const id = req.params?.id;

        if(!id)
        {
            return res.status(400).json({
                message:"id is undefined",
            });
        };

        const isUser = await userModel.findOne({
            _id:id
        });

        if(!isUser)
        {
            return res.status(404).json({
                message:'user not found.',
            });
        };

        const posts = await postModel.find({
            user_id:id,
        }).populate();

        const followerCount = await followModel.countDocuments({
            following:id,
        });

        const followingsCount = await followModel.countDocuments({
            follower:id,
        });


        res.status(200).json({
            message:'profile displayed successfully.',
            isUser,
            posts,
            followerCount,
            followingsCount,
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message:'internal server error'
        })
    }
}

exports.userSearchController = async (req,res)=>{

    try {
        
        const {query} = req.query;

        if(!query){
            return res.status(400).json({
                message:"serach query is incomplete",
            });
        };

       
       const users = await userModel.find({
        username : {$regex:query , $options :"i"}
       });

       if(users.length === 0)
       {
        return res.status(404).json({
            message:'user not found.',
            users:users,
        });
       };

       res.status(200).json({
        message:'users get successfully...',
        users:users
       });



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:'internal server error.'
        })
    }

}