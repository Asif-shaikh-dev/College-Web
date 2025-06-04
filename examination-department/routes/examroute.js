const express = require('express');
const studentModel = require('../models/studentModel')
const router = express.Router();
const { transporter } = require('../db/nodemailer')

// Example route
// const callback = (req, res, next) => {
//     const studentId = '202503247601'
//     req.body.studentId = studentId
//     next();
// }


// router.get('/example', callback, async (req, res) => {
//     const { studentId } = req.body;

//     const student = await studentModel.findOne({ studentId });
//     if (!student) {
//         res.json({ success: false, message: "Student Not Found" })
//     }


//     const generateExamForm = async (studentId) => {
//         const student = await studentModel.findOne({ studentId });
//         if (!student) {
//             return { success: false, message: "Student Not Found" }
//         }

//     }

//     if (student.feesPaid >= student.totalFee) {
//         res.json({ success: true, message: "Student has paid all fees" })

//     } else {
//         res.json({ success: false, message: "Please Pay full Fee To Proceed" })
//         res.send('Example route');
//     }

//     console.log('student', student.fullname)

// });

// 📌 Step 1: Student Login & Fee Check
router.post('/student-login', async (req, res) => {
    try {
        const { studentId } = req.body;

        // Find student by email OR mobile number
        if (studentId === "abutalhavlogs") { // Replace with actual special ID logic
            return res.json({ success: true, redirectTo: "/special-page" });
        }
        const student = await studentModel.findOne({ studentId });

        if (!student) {
            return res.json({ success: false, message: "Student Not Found" });
        }


        if(student.ExamSeatNO){
            return res.json({ success: false, message: "Form already Fiiled. Contact Exam Department" });
        }
        // Check if fees are fully paid
        if (!student.feesPaid) {
            return res.json({ success: false, message: "Fees Not Paid. Please complete the payment." });
        }

        // if(student.subjects.length > 0) {
        //     return res.json({ success: false, message: "Form already Fiiled. Contact HOD" });
        // }

        // Fetch subjects based on the selected course
        const subjects = student.subjects
        const examSubjects = student.ExamSubjects;

        res.json({
            success: true,
            message: "Login Successful",
            student: {
                name: student.fullname,
                email: student.email,
                selectedCourse: student.courseSelection,
                subjects, examSubjects
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error", error });
    }
});

router.post('/get-students',async(req,res)=>{

    const students = await studentModel.find().sort({ ExamSeatNO: 1 }); // Sort in ascending order

    if (students.length === 0) {
        return res.json({ success: false, message: "No students found" });
    }
    
    return res.json({ success: true, students });
    
})

// 📌 Step 2: Function to Get Subjects Based on Course
// const getSubjectsForCourse = async (course) => {
//     // Example: Subject data stored in MongoDB
//     const courseSubjects = {
//         "BBA": ["Business Management", "Marketing Principles", "Financial Accounting"],
//         "BCOM": ["Corporate Finance", "Taxation", "Business Law"],
//         "BA": ["History", "Political Science", "Sociology"],
//         "BSC": ["Physics", "Chemistry", "Biology", "Mathematics"],
//         "BSC CS": ["Data Structures", "Algorithms", "Database Management Systems", "Operating Systems"]
//     };


//     return courseSubjects[course] || [];
// };

// 📌 Step 3: Student Selects Subjects & Submits Form
router.post('/submit-subjects', async (req, res) => {
    try {
        const { email, selectedSubjects } = req.body;

        // Find student by email
        const student = await studentModel.findOne({ email });

        if (!student) {
            return res.json({ success: false, message: "Student Not Found" });
        }

        // await studentModel.findByIdAndUpdate(student._id, { ExamSubjects: selectedSubjects });
        // await student.save();
        // Update student with selected subjects

        // Function to generate a unique 4-digit ExamSeatNo
        async function generateUniqueSeatNumber() {
            let seatNumber;
            let exists;

            do {
                seatNumber = Math.floor(1000 + Math.random() * 9000);
                exists = await studentModel.exists({ ExamSeatNO: seatNumber }); // Check uniqueness
            } while (exists);

            return seatNumber;
        }

        // Assign unique ExamSeatNo to the student
        const ExamSeatNo = await generateUniqueSeatNumber();

        student.ExamSeatNO = ExamSeatNo;
        student.ExamSubjects = selectedSubjects;

        await student.save();


        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: student.email,
            subject: "Subject Confirmation",
            // text:"Thank you you paid 1000",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Subject Selection Confirmation</title>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px; }
                        .container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 500px; margin: auto; }
                        h1 { color: #4CAF50; }
                        p { font-size: 18px; color: #333; }
                        .details { margin-top: 20px; font-weight: bold; color: #555; }
                        .subjects { background: #f9f9f9; padding: 10px; border-radius: 8px; display: inline-block; text-align: left; margin-top: 10px; }
                        .footer { margin-top: 30px; font-size: 14px; color: #777; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Subject Selection Successful! 🎓</h1>
                        <p>Dear <strong>${student.fullname}</strong>,</p>
                        <p>You have successfully selected your subjects for your course: <strong>${student.courseSelection}</strong>.</p>
                        <p>Your Examination Seat No Is: <strong>${student.ExamSeatNO}</strong>.</p>
                        <div class="details">
                            <p><strong>Selected Subjects:</strong></p>
                            <div class="subjects">
                                <ul>
                                    ${student.subjects.map(subject => `<li>${subject}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <p>We are excited to have you onboard! 🎉</p>
                        <div class="footer">
                            <p>If you have any questions, feel free to contact our support team.</p>
                        </div>
                    </div>
                </body>
                </html>

                 `
          };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Payment confirmation email sent.");
        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ error: "Email sending failed, but payment is successful" });
        }

        res.json({ success: true, message: "Subjects selected successfully. Confirmation email sent." });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
});

// 📌 Step 4: Function to Send Confirmation Email



module.exports = router;
