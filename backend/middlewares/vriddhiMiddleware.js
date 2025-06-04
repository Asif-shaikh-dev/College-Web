module.exports.authVridhhi = async (req,res,next) => {
            const token = req.cookies.vridhhiToken ;
        // console.log("tokent",token)
            if(!token){
                return res.json({success:false,errors:[{msg:"Unauthorized token not found"}]})
            }
            
        try {
            // Verify JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded)
          
            
    
            next(); // Move to the next middleware or route handler
    
        } catch (error) {
            // console.log(error)
            return res.status(401).json({ success:false, messege:error.messege });
        }

       
    
}