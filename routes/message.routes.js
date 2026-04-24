const { Router } = require("express");
const authHandler = require("../middleware/auth.middleware");
const { sendMessage, getMessages } = require("../controllers/messageController");


const messageRouter = Router();

messageRouter.post('/:id',authHandler,sendMessage);
messageRouter.get('/:id',authHandler,getMessages);

module.exports = messageRouter;