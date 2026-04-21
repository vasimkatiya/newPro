const { Router } = require("express");
const authHandler = require("../middleware/auth.middleware");
const { userController, userProfileController, userSearchController } = require("../controllers/userController");


const userRouter = Router();

userRouter.get('/',authHandler,userController);
userRouter.get('/all',authHandler,userSearchController);
userRouter.get("/:id",authHandler,userProfileController);


module.exports = userRouter;