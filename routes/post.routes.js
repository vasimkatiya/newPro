const { Router } = require("express");
const multer = require('multer');
const authHandler = require("../middleware/auth.middleware");
const { createPostController, getPostsController, deletePostController, singlePostController, toggleLikeController } = require("../controllers/postControllers");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 }
});


const postRouter = Router();

postRouter.post('/create',upload.single('image'),authHandler,createPostController);
postRouter.get('/all',authHandler,getPostsController);
postRouter.delete('/:id',authHandler,deletePostController);
postRouter.get('/:id',authHandler,singlePostController);
postRouter.post("/:id/likes",authHandler,toggleLikeController);

module.exports = postRouter;