const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { uploadFile } = require("../utils/cloudnaryConfig");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerController = async (req,res)=>{

  try {
    const {username,password} = req.body;
    const file = req.file;

    if(!username || !password || !file )
    {
        return res.status(400).json({
            message:"fill all the fields",
        });
    }

     const existsUser = await userModel.findOne({username});

        if(existsUser)
        {
            return res.status(400).json({
                message:'username is already exists'
            });
        };
    
    const hashPassword = await bcrypt.hash(password,10);
    
    let result = null;
    
    if(file){
        result = await uploadFile(file.buffer);
        console.log("file buffer : ",result);
    }

    console.log(result)

    const avatar = result.secure_url;

    const createUser = await userModel.create({
        username:username,
        password:hashPassword,
        avatar:avatar
    })

    console.log("new user :",createUser);

    res.status(201).json({
        user:createUser,
        avatar:avatar,
        message:'user created successfully.'
    })
    
  } catch (err) {
    console.error(err)
    return res.status(500).json({
        message:"internal server error."
    })
  }

}

exports.loginController = async (req,res)=>{

    try {

        const {username,password} = req.body;

        if(!username || !password){
            return res.status(400).json({
                message:'username or password is required'
            })
        }

        const user = await userModel.findOne({username});

        if(!user){
            return res.status(400).json({
                message:'username is not exists'
            });
        };

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:'password is incorrect'
            });
        };

       const token = jwt.sign({id:user._id},
        process.env.JWT_KEY
       );

       res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
        });

       res.status(200).json({
        message:'user successfully login',
        user:user,
        token
       });

        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message:'internal server error'
        })
    }

}

exports.logoutController = (req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({
            message:'token is not created.',
        });
    };

    res.clearCookie("token");

    res.status(200).json({
        message:'user logout successfully.'
    });

};

