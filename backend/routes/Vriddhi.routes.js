const express = require('express')
const router = express.Router()
const studentModel = require('../models/student.models')
const multer = require("multer");
const mongoose = require('mongoose')
const axios = require('axios');

const jwt = require('jsonwebtoken');
const { transporter } = require('../db/nodemailer');
const { authVridhhi } = require('../middlewares/vriddhiMiddleware');

const approvalSchema = new mongoose.Schema({
    studentId: String,
    fullname: String,
    email: String,
    courseSelection: String,
    gender: String,
    mobile: String,
    fatherName: String,
    motherName: String,
    parentContact: String,
    currAddress: String,
    tenthBoard: String,
    tenthYear: String,
    tenthPercentage: String,
    subjects: [String],
    collegeName: String,

    stream: String,
    twelfthPercentage: String,
    documents: Object,
    status: { type: String, default: '' }
});

const ApprovalRequest = mongoose.model("ApprovalRequest", approvalSchema);


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });



router.post('/admission', upload.fields([
    { name: "tenthMarksheet", maxCount: 1 },
    { name: "twelfthMarksheet", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "adharCard", maxCount: 1 },
    { name: "casteCertificate", maxCount: 1 },
    { name: "incomeCertificate", maxCount: 1 },
    { name: "lc", maxCount: 1 },
    { name: "domicile", maxCount: 1 },
]), async (req, res) => {
    try {




        const { email,studentId, courseSelection, gender, mobile, fatherName, motherName, parentContact, currAddress,
            tenthBoard, tenthYear, tenthPercentage, collegeName, stream,
            twelfthPercentage, subjects } = req.body;

        const requiredFields = [
            "tenthMarksheet",
            "twelfthMarksheet",
            "passportPhoto",
            "adharCard",
            "lc",
            "domicile"
        ];

        // Check if any required field is missing
        const missingFields = requiredFields.filter(field => !req.files[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: `Missing required files: ${missingFields.join(", ")}`
            });
        }

        if (!email || !courseSelection || !gender || !mobile || !fatherName || !motherName || !parentContact || !currAddress ||
            !tenthBoard || !tenthYear || !tenthPercentage || !collegeName || !stream || !twelfthPercentage || !subjects) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //aproval frontend se data  milta hai


        // Check if the student exists
        let student = await studentModel.findOne({ studentId });

        console.log("student found", student)
        if (!student) {
            return res.status(401).json({ success: false, message: "Student Not Registered" });
        }
    
        if( student.email !== email) {
            return res.status(401).json({ success: false, message: "Email ID does not match with Student ID" });
        }
        

        let documents = student.documents || {};
        if (req.files) {
            Object.keys(req.files).forEach((key) => {
                documents[key] = `${process.env.PRODUCTION_URL2}/uploads/${req.files[key][0].filename}`;
            });
        }
     

        student.courseSelection = courseSelection;
        student.gender = gender;
        student.mobile2 = mobile;
        student.fatherName = fatherName;
        student.motherName = motherName;
        student.parentContact = parentContact;
        student.currAddress = currAddress;
        student.tenthBoard = tenthBoard;
        student.tenthYear = tenthYear;
        student.tenthPercentage = tenthPercentage;

        student.collegeName = collegeName;

        student.stream = stream;
        student.documents = documents;
        student.subjects = subjects;
        student.twelfthPercentage = twelfthPercentage;
        student.status = "Pending Approval";
        // Ensure this field exists in schema


        // Merge old & new documents

        await student.save(); // Update the student in the database

        try {
            await axios.post(`${process.env.PRODUCTION_URL2}/vriddhi/approval`, {
                studentId: student.studentId,
                fullname: student.fullname,
                email: student.email,
                courseSelection: student.courseSelection,
                gender: student.gender,
                mobile: student.mobile,
                fatherName: student.fatherName,
                motherName: student.motherName,
                parentContact: student.parentContact,
                currAddress: student.currAddress,
                tenthBoard: student.tenthBoard,
                tenthYear: student.tenthYear,
                tenthPercentage: student.tenthPercentage,
                subjects: student.subjects,
                collegeName: student.collegeName,

                stream: student.stream,
                twelfthPercentage: student.twelfthPercentage,
                documents: student.documents, // ✅ Include uploaded documents
                status: "Pending Approval",
            });
            // console.log("Student data submitted successfully!");
        } catch (error) {
            console.error("Error submitting student data:", error.response?.data || error.message);
        }


        res.status(200).json({ message: "Student data updated & sent for approval" });
    } catch (error) {
        console.error("Error in student admission:", error);
        res.status(500).json({ error: "Server error" });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email != process.env.VRIDDHI_LOGIN || password != process.env.VRIDDHI_PASS) {

            return res.status(404).json({ success: false, message: "Invalid Email or password" });

        }
        // 1️⃣ Find student by email
        const payload = { userId: 123, role: process.env.VRIDDHI_ROLE };

        const options = { expiresIn: "1h" };

        const Vriddhitoken = jwt.sign(payload, process.env.JWT_SECRET, options);

        // console.log('token',Vriddhitoken)

        res.cookie('vridhhiToken', Vriddhitoken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(201).json({ message: "Admission form submitted!", token: Vriddhitoken, role: process.env.VRIDDHI_ROLE });
    } catch (error) {
        console.log("Error in Vriddhi Routes", error.message)
        res.status(500).json({ error: "Error submitting admission form" });
    }
})

router.post('/application-list', authVridhhi, async (req, res) => {
    try {
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ success: false, message: "Failed to fetch students" });
    }
})


router.post('/approval', async (req, res) => {
    try {
        const { studentId, ...studentData } = req.body;

        // Check if a request already exists for this student
        let existingRequest = await ApprovalRequest.findOne({ studentId });

        if (existingRequest) {
            // Update existing request instead of creating a new one
            existingRequest.status = "Pending Approval";
            existingRequest.set(studentData); // Update all fields
            existingRequest.resubmittedAt = new Date();
            await existingRequest.save();

            return res.status(200).json({ success: true, message: "Approval request updated successfully", data: existingRequest });
        } else {
            // If no existing request, create a new one
            const newApprovalRequest = new ApprovalRequest({
                studentId,
                ...studentData,
                status: "Pending Approval",
                submittedAt: new Date(),
            });

            await newApprovalRequest.save(); // Save the request in database

            res.status(201).json({ message: "Approval request received", data: newApprovalRequest });
        }
    } catch (error) {
        console.error("Error saving approval request:", error);

        res.status(500).json({ success: false, message: "Failed to process Approval Request" });
    }
});


router.get('/pending-approvals', async (req, res) => {
    try {
        const pendingApprovals = await ApprovalRequest.find({ status: "Pending Approval" });
        res.status(200).json(pendingApprovals);
    } catch (error) {
        console.error("Error fetching pending approvals:", error);
        res.status(500).json({ success: false, message: "Failed to fetch pending approvals" });
    }
});


router.post('/approveStudent', async (req, res) => {
    try {
        // const studentId = req.body.studentId;
        const { studentId } = req.body;
        const student = await ApprovalRequest.findOne({ studentId });
        const studentOriginal = await studentModel.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" })
        }

        // console.log("Student Approved")
        student.status = "Approved";
        studentOriginal.status = "Approved";

        const path = require('path')
        const fs = require('fs')
        const PDFDocument = require('pdfkit')




        async function generatePDF(studentOriginal) {
            const doc = new PDFDocument();
            const pdfPath = path.join(__dirname, `Student_Admission_Form_${studentOriginal.studentId}.pdf`);
            const writeStream = fs.createWriteStream(pdfPath);
            doc.pipe(writeStream);

            // Fetch & save image locally
            const imageUrl = studentOriginal.documents.passportPhoto; // URL from MongoDB
            const imagePath = path.join(__dirname, "temp_profile_image.jpg"); // Temp storage

            try {
                const response = await axios({
                    url: imageUrl,
                    responseType: "arraybuffer", // Get image data
                });
                fs.writeFileSync(imagePath, response.data); // Save locally

                // ✅ Add Image to PDF (Top-Right)
                const pageWidth = doc.page.width;
                const imageWidth = 100;
                const xPos = pageWidth - imageWidth - 50; // Right align
                doc.image(imagePath, xPos, 50, { width: imageWidth, height: 100 });
            } catch (error) {
                console.error("❌ Error downloading image:", error.message);
            }

            doc.fontSize(20).text("Admission Form", { align: "center" }).moveDown();
            doc.fontSize(14).text(`Full Name: ${studentOriginal.fullname}`);
            doc.text(`Email: ${studentOriginal.email}`);
            doc.text(`Course Selection: ${studentOriginal.courseSelection}`);
            doc.text(`Gender: ${studentOriginal.gender}`);
            doc.text(`Mobile: ${studentOriginal.mobile}`);
            doc.text(`Father's Name: ${studentOriginal.fatherName}`);
            doc.text(`Mother's Name: ${studentOriginal.motherName}`);
            doc.text(`Parent Contact: ${studentOriginal.parentContact}`);
            doc.text(`Current Address: ${studentOriginal.currAddress}`);
            doc.text(`10th Percentage: ${studentOriginal.tenthPercentage}`);
            doc.text(`12th Percentage: ${studentOriginal.twelfthPercentage}`);

            doc.moveDown();
            doc.text("Documents Submitted:");
            doc.text(`Adhar Card: ${studentOriginal.documents.adharCard ? "✅ Yes" : "❌ No"}`);
            doc.text(`10th Marksheet: ${studentOriginal.documents.tenthMarksheet ? "✅ Yes" : "❌ No"}`);
            doc.text(`12th Marksheet: ${studentOriginal.documents.twelfthMarksheet ? "✅ Yes" : "❌ No"}`);

            doc.moveDown().text("Approved by: Abeda Inamdar Senior College", { align: "center" });
            doc.end();

            // Wait until PDF is saved
            writeStream.on("finish", async () => {
                console.log("PDF Generated:", pdfPath);
            });

            const Email = studentOriginal.email;

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: Email,
                subject: "Student Approval",
                // text:"Thank you you paid 1000",
                html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Student Approval</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px; }
                    .container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
                    h1 { color: #4CAF50; }
                    p { font-size: 18px; color: #333; }
                    .details { margin-top: 20px; color: #555; }
                    .footer { margin-top: 30px; font-size: 14px; color: #777; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Student Approved!</h1>
                    <p>Dear,<strong>${studentOriginal.fullname}</strong></p>
                    <div class="details">
                        <p>Your Admission Form is at<strong> Abeda Inamdar Senior College</strong> is approved.. Contact College for Further Assistance</p>
                    </div>
                  <p>Please find your official admission form attached. Complete any further steps required.</p>
                    <div class="footer">
                        <p>If you have any questions, contact our support team.  studentsupport@vriddhisoftware.com</p>
                    </div>
                </div>
            </body>
            </html>
        `,
                attachments: [
                    {
                        filename: `Student_Admission_Form_${studentId}.pdf`,
                        path: pdfPath,
                    },
                ],

            }

            try {
                await transporter.sendMail(mailOptions);
                console.log("Addmission confirmation email sent.");
            } catch (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ success: false, message: "Email sending failed, but payment is successful" });
            }
        }

        generatePDF(studentOriginal);



        await student.save();
        await studentOriginal.save();

        res.status(200).json({ success: true, message: "Student Approved" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "failed to approve student bro" });
    }
})

router.post('/rejectStudent', async (req, res) => {
    try {

        const { studentId } = req.body;

        const student = await ApprovalRequest.findOne({ studentId });
        const studentOriginal = await studentModel.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found bro2" })
        }

        console.log("Student Rejected")
        student.status = "Rejected";
        studentOriginal.status = "Rejected";

        await student.save();
        await studentOriginal.save();

        res.status(200).json({ success: true, message: "Student Approved" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "failed to reject student" })
    }
})


module.exports = router