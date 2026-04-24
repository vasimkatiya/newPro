
const commentModel = require("../models/commentModel");

exports.postCommentController = async (req,res)=>{

  try {
      const id = req.params.id;

      console.log("BODY :",req.body);
      

      const text = req.body?.text;
    const userId = req.user.id;

    if(!text)
    {
        return res.status(400).json({
            message:'text is required.'
        })
    }
    if(!id || !userId)
    {
        return res.status(400).json({
            message:'post id and user auth is required.',
        }) ;
    };

    const addComment = await commentModel.create({
        text,
        post_id:id,
        user_id:userId
    });

    if(!addComment)
    {
        return res.status(400).json({
            message:'comments are not created'
        });
    }

    res.status(201).json({
        message:'comment created successfully.',
        addComment,
        userId,
        post_id : id,
    });


  } catch (err) {
    console.error(err);
    return res.status(500).json({
        message:'internal server error.'
    });
  }
}

exports.getCommentController = async (req,res)=>{

    try{

        const id = req.params.id;
       
        
        if(!id)
    {
        return res.status(400).json({
            message:'postId undefined.',
        });
    };
    
    const comments = await commentModel.find({
        post_id:id,
    }).populate('post_id user_id');

    if(comments.length === 0)
        {
            return res.status(200).json({
                message:'comments not fetched.',
            });
        };


    res.status(200).json({
        message:'all comments fetched successfully.',
        comments,
        post_id:id,
    });
}catch(err){
    console.error(err);
    return res.status(500).json({
        message:'internal server error',
    });
}

}

exports.deleteCommentController = async (req, res) => {
    try {
        const id = req.params?.id;
        const userId = req.user?.id;

        if (!id || !userId) {
            return res.status(400).json({
                message: "commentId and user auth required"
            });
        }

        const deleted = await commentModel.findOneAndDelete({
            _id: id,
            user_id: userId
        });

        if (!deleted) {
            return res.status(404).json({
                message: "only comment creator can delete comment"
            });
        }

        res.status(200).json({
            message: "comment deleted successfully",
            deleted
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "internal server error"
        });
    }
};