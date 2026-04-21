const { Router } = require("express");
const authHandler = require("../middleware/auth.middleware");
const { toggleFollowController } = require("../controllers/followController");

const followRouter = Router();

followRouter.get('/:id',authHandler,toggleFollowController);

module.exports = followRouter;
