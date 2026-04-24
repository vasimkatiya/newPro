const { Router } = require("express");
const multer = require("multer");
const { registerController, loginController, logoutController } = require("../controllers/authController");
const authHandler = require("../middleware/auth.middleware");


const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 }
});

const authRouter = Router();

authRouter.post("/register",upload.single("avatar"),registerController);
authRouter.post('/login',upload.none(),loginController);
authRouter.get('/logout',logoutController);
authRouter.get('/me', authHandler, (req, res) => {
    res.json({
        user: req.user
    });
});

module.exports = authRouter;