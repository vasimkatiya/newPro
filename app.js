const express = require('express');
const { connectDB } = require('./db/connection');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post.routes');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectDB();
app.get('/',(req,res)=> res.send("<h1>working successfully.</h1>"))

//all source routers
app.use("/api/auth",authRouter);
app.use('/api/post',postRouter)

app.listen(3000);