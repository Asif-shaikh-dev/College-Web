const express = require('express')
const router = express.Router()
const studentModel = require('../models/student.models')
const { body } = require("express-validator")
const studentController = require('../controllers/authController')
const authMiddleware = require('../middlewares/auth.middleware')
const { getStudentData } = require('../controllers/studentController')
const { transporter } = require('../db/nodemailer')
const { THANK_YOU_EMAIL,EMAIL_VERIFY_TEMPLATE } = require('../db/EmailTemplate')
const bcrypt = require('bcryptjs')

router.post('/login_2StudRegistrationInfo', [
    body('fullname').isLength({ min: 3 }).withMessage("Full name must be at least 3 characters"),
    body('email').isEmail().withMessage('Invalid Email'),
    body('mobile').isLength({ min: 10 }).withMessage("Mobile number must be at least 10 characters"),
    body('birthdate').isDate().withMessage("Invalid birthdate"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
],
    studentController.registerStudent
)


router.post('/Login_8StudRegistrationInfoConfirmContinue', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage("Password must be atleast 6 characters")
],
    studentController.loginStudent
)

router.get('/is-auth', authMiddleware.authStudent, studentController.getStudentProfile);

router.get('/data', authMiddleware.authStudent, getStudentData)

router.post('/logout', studentController.logoutStudent)


router.post('/send-verify-otp', authMiddleware.authStudent, studentController.sendVerifyOtp);

router.post('/verify-account', authMiddleware.authStudent, studentController.verifyEmail);
router.post('/send-reset-otp', studentController.sendResetOtp);


router.post('/reset-password', studentController.resetPassword);

router.post("/update-payment",studentController.updatePayement);

router.post("/pay-admission-fee", authMiddleware.authStudent, studentController.payAdmissionFee);

router.post("/submit-admission", async (req, res) => {
    try {
        const { email, courseSelection,documents } = req.body;

        // 1️⃣ Find student by email
        let student = await studentModel.findOne({ email });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // 2️⃣ Update student details
        student = await studentModel.findOneAndUpdate(
            { email }, // Find student by email
            { $set: { courseSelection, documents, status: "Pending" } },
            { new: true } // Return updated student
        );

        res.status(200).json({ message: "Admission form submitted!", student });
    } catch (error) {
        res.status(500).json({ error: "Error submitting admission form" });
    }
});






// Send OTP API
let otpStore = {}; // Temporary store for OTPs (use Redis in production)
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({success:false, message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    // Send OTP via email (Replace with actual email service)
    const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Account Verification OTP',
        // text: `Your otp is : ${otp}`
        html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",email)

    }

    try {
        await transporter.sendMail(mailOption);
        console.log("Otp Sent On Email Successfully")
        res.json({ success: true, message: "OTP sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP" });
    }
});

// Verify OTP & Update Student Data API
router.post("/update", async (req, res) => {
    const { email, field, newValue, otp } = req.body;

    if (!email || !field || !newValue || !otp) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (otpStore[email] !== otp) {
        return res.status(401).json({success:false, error: "Invalid OTP" });
    }

    try {
        let updateData = { [field]: newValue };

        if (field === "password") {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(newValue, saltRounds);
            
        }

        const updatedStudent = await studentModel.findOneAndUpdate(
            { email },
            updateData,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        delete otpStore[email]; // Remove OTP after successful update
        res.json({ success: true, message: "Data updated successfully!", student: updatedStudent });

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, error: "Database update failed" });
    }
});

module.exports = router;



module.exports = router