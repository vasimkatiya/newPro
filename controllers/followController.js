const followModel = require("../models/followModel");
const userModel = require("../models/userModel");

exports.toggleFollowController = async (req, res) => {

    try {
        
    const followerId = req.user?.id;
    const followingId = req.params.id;

    if (!followingId || !followerId) {
        return res.status(400).json({
            message: "follower or following id is undefined.",
        });
    };

    if (followerId === followingId) {
        return res.status(400).json({
            message: "You cannot follow yourself",
        });
    }

    const checkUser = await userModel.findOne({
        _id: followerId,
    });

    if (!checkUser) {
        return res.status(404).json({
            message: "user not found",
        });
    };

    const existingFollow = await followModel.findOne({
        follower: followerId,
        following: followingId,
    });

    if (existingFollow) {
        await followModel.deleteOne({
            follower: followerId,
            following: followingId,
        });

        const followersCount = await followModel.countDocuments({
            following: followingId
        });
        const followingCount = await followModel.countDocuments({
            follower: followerId
        });

        return res.status(200).json({
            message: "unfollow successfully",
            followersCount,
            followingCount
        });
    };

    const followUser = await followModel.create({
        follower: followerId,
        following: followingId,
    });


    const followersCount = await followModel.countDocuments({
        following: followingId
    });
    const followingCount = await followModel.countDocuments({
        follower: followerId
    });


    res.status(200).json({
        message: "follow successfully",
        followersCount,
        followingCount,
        followUser,
    });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message:'internal server error'
        })
    }

}