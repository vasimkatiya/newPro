const jwt = require('jsonwebtoken');
require("dotenv").config();

const authHandler = (req,res,next) =>{
    try{

        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:'token is not generated',
            });
        };

        const decoded = jwt.verify(token,process.env.JWT_KEY);

        console.log(" decoded jwt verfication ",decoded)

        req.user = decoded

        next();

    }catch(err){
        console.error(err);
        return res.status(401).json({
            message:'unauthorize user'
        })
    }
}

module.exports = authHandler;