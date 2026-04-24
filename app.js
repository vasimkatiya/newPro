const express = require('express');
const { connectDB } = require('./db/connection');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');
const followRouter = require('./routes/follow.routes');
const userRouter = require('./routes/user.routes');
const messageRouter = require('./routes/message.routes');
const {app,server,io} = require('./server');
const cors = require('cors');
const { allUser } = require('./controllers/userController');
const authHandler = require('./middleware/auth.middleware');

app.use(cors({
    origin : 'https://sociogram83.netlify.app/',
    credentials : true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectDB();
app.get('/',(req,res)=> res.send("<h1>working successfully.</h1>"))

//all source routers
app.use("/api/auth",authRouter);
app.use('/api/post',postRouter);
app.use('/api/comment',commentRouter);
app.use('/api/follow',followRouter);
app.use('/api/user',userRouter);
app.use('/api/message',messageRouter);
app.use('/api/all',authHandler,allUser)

server.listen(3000, () => {
    console.log("localhost : 3000 , is running......");
});