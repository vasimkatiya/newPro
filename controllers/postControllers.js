const postModel = require("../models/postModel");
const { uploadFile } = require("../utils/cloudnaryConfig");


exports.createPostController = async(req,res)=>{

    try{

    const {caption} = req.body;
    const userId = req.user?.id;
    const file = req.file

    if(!file || !caption || !userId)
    {
        return res.status(400).json({
            message:'fill the required fields'
        });
    };

    let result = null;

    if(file){
        result = await uploadFile(file.buffer);
    }

    const imageUrl = result.secure_url


    const addPost  = await postModel.create({
        user_id:userId,
        url:imageUrl,
        caption:caption,
    });

    res.status(201).json({
        message:'post created successfully',
        addPost,
        userId
    });

    }catch(err)
    {
        console.error(err);
        return res.status(500).json({
            message:'server error.'
        })
    }

}

exports.getPostsController = async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 7;
    const offset = (page-1)*limit;

    const fetchPost = await postModel.find().sort({createdAt:-1}).skip(offset).limit(limit);

    if(!fetchPost)
    {
        return res.status(400).json({
            message:'post not fetched.'
        });
    }

    if(fetchPost.length == 0)
    {
        return res.status(400).json({
            message:'post not created'
        });
    }

    res.status(200).json({
        message:'post fetched successfully.',
        fetchPost,
    });
}

exports.deletePostController = async (req,res)=>{
   try {
    
    const id = req.params.id;
    const userId = req.user?.id;

    const deletePost = await postModel.deleteOne({
        _id:id,
        user_id:userId
    });

    if(deletePost.deletedCount == 0 )
    {
        return res.status(400).json({
            message:'post delete not found.',
        });
    };

    res.status(200).json({
        message:'post deleted successfully.',
        deletePost,
    });
    


   } catch (err) {
    console.error(err);
    return res.status(500).json({
        message:'internal server error.'
    });
   };
}

exports.singlePostController = async (req,res)=>{
    const id = req.params.id;

    if(!id)
    {
        return res.status(400).json({
            message:'post id is not found'
        })
    }

    const singlePost = await postModel.findOne({
        _id:id
    });

    if(!singlePost){
        return res.status(400).json({
            message:'post not found.',
        });
    };

    res.status(200).json({
        message:'post fetched successfully.',
        singlePost,
    });

}

