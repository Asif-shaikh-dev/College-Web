const express = require('express')
const router = express.Router()
const Teacher = require('../models/teacherModels')
const studentModel = require('../models/student.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const HODModels = require('../models/HODModels');
const { default: mongoose } = require('mongoose')
const teacherMiddleware = require('../middlewares/teacherMiddleware')



router.post("/register", async (req, res) => {
  const { name, email, mobile, password, department, subject } = req.body;

  const existingTeacher = await Teacher
    .findOne({ email, department, subject, status: "pending" });

  if (existingTeacher) {
    return res.status(400).json({ message: "Teacher already exists for this department" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newTeacher = new Teacher({
    name,
    email,
    mobile,
    password: hashedPassword,
    department,
    subject,
  });
  try {
    await newTeacher.save();
    res.status(200).json({ success: true, message: "Registration successful! Waiting for HOD approval." });
  } catch (err) {
    res.json({ success: false, message: "Registration failed. Try again." });
  }

});



router.post("/login", async (req, res) => {
  const { email2, password, userType } = req.body;

  if (!email2 || !password || !userType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    if (userType === "HOD") {
      const existingHOD = await HODModels.findOne({ email: email2 });
      if (!existingHOD) {
        return res.status(401).json({ message: "HOD not found" });
      }

      const isMatch = await bcrypt.compare(password, existingHOD.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const tokenforHOD = jwt.sign({ id: existingHOD._id, userType: "HOD" }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.cookie("tokenforHOD", tokenforHOD, { httpOnly: true, secure: true, sameSite: "Strict" }) // Store in HTTP-only cookie

      return res.status(201).json({ message: "Login successful", tokenforHOD, user: existingHOD });
    }

    if (userType === "teacher") {
      const teacher = await Teacher.findOne({ email: email2, approved: "approved" });
      if (!teacher) {
        return res.status(401).json({ message: "Teacher not found or not approved" });
      }


      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // localStorage.setItem("resetRequestedteacher");
      const tokenforTeacher = jwt.sign({ id: teacher._id, userType: "teacher" }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.cookie("tokenforTeacher", tokenforTeacher, { httpOnly: true, secure: true, sameSite: "Strict" }) // Store in HTTP-only cookie

      return res.status(201).json({ message: "Login successful", tokenforTeacher, user: teacher });
    }

    return res.status(400).json({ message: "Invalid user type" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/students", teacherMiddleware, async (req, res) => {
  try {


    const teacherId = req.teacherId?.toString();
    // console.log("Received teacherId from middleware:", req.teacherId); 
    // Validate if teacherId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Invalid Teacher ID" });
    }
    const teacher = await Teacher.findById(teacherId);
    console.log("Id",teacherId)   

    // Debugging log



    if (!teacher || teacher.approved !== "approved") {
      return res.status(403).json({ sucess: false, message: "Unauthorized" });
    }


    const student1 = await studentModel.find();

    for (let student of student1) {
      if (typeof student.subjects[0] === "string" && student.subjects[0].includes(",")) {
        await studentModel.updateOne(
          { _id: student._id },
          { $set: { subjects: student.subjects[0].split(",") } }
        );
      }
    }
    const students = await studentModel.find({
      courseSelection: teacher.department,
      subjects: { $in: [teacher.subject] }
    });


    res.status(200).json({ success: true, data: students,teacher:teacher });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }

});

module.exports = router;