const jwt = require("jsonwebtoken");

const teacherMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.tokenforTeacher || req.cookies.tokenforHOD; // Get token from cookies
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // console.log("Cookies:", req.cookies);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)

    if (decoded.userType === "teacher") {
        req.teacherId = decoded.id; // Attach teacherId to req
      
    }else if(decoded.userType === "HOD"){
        req.hodId = decoded.id; // Attach hodId to req

    }else{
        return res.status(403).json({ message: "Unauthorized: Invalid user type" });
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = teacherMiddleware;
