const studentModel = require('../models/student.models');
const bcrypt = require('bcryptjs')    
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blackListToken.models');

// console.log('Blacklist Token Model:', blacklistTokenModel);


module.exports.authStudent = async (req,res,next) =>{
    const token = req.cookies.token ;
    // console.log("tokent",token)
    if(!token){
        return res.json({success:false,errors:[{msg:"Unauthorized token not found"}]})
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token:token});
    
// console.log(process.env.JWT_SECRET)

    if(isBlacklisted){
        console.error("Unauthorized blacklisted token detected:");
        return res.status(401).json({errors:[{msg:"Unauthorized blackisted"}]})
    }


    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
      
        if(decoded._id){
            req.body.studentId = decoded._id;
        }else{
            return res.json({success:true,message:'Not Authorized, Login again'})
        }
        

        next(); // Move to the next middleware or route handler

    } catch (error) {
        console.log("Error in authMiddleware",error)
        return res.status(401).json({ success:false, messege:error.messege });
    }

}


module.exports.authOwner = async (req,res,next) => {
    const token = req.cookies.Vriddhitoken;

    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized"})
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Owner Token:", decoded);
        if(decoded.userId){
            req.body.userId = decoded.userId;
        }else{
            return res.json({success:true,message:'Not Authorized, Login again'})
        }
        

        next(); // Move to the next middleware or route handler

    } catch (error) {
        console.log("Error in authMiddleware",error)
        return res.status(401).json({ success:false, messege:error.messege });
    }
}
