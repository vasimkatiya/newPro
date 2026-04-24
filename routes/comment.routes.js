const { Router } = require("express");
const authHandler = require("../middleware/auth.middleware");
const { postCommentController, getCommentController, deleteCommentController } = require("../controllers/commentController");


const commentRouter = Router();

commentRouter.post('/:id/comments',authHandler,postCommentController);
commentRouter.get('/:id/comments',getCommentController);
commentRouter.delete("/:id",authHandler,deleteCommentController);

module.exports = commentRouter;