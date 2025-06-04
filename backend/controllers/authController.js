const studentModel = require('../models/student.models')
const studentService = require("../services/student.services")
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.models')

const bcrypt = require('bcryptjs')

const {transporter} = require('../db/nodemailer')


async function generateUniqueUserId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const datePrefix = `${year}${month}${day}`;

    let studentId;
    let isUnique = false;

    while (!isUnique) {
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
        studentId = `${datePrefix}${randomNum}`;

        const existingUser = await studentModel.findOne({ studentId });

        if (!existingUser) {
            isUnique = true;
        }
    }

    return studentId;
}

// async function test() {
//     const id = await generateUniqueUserId();
//     console.log(id);
// }
// test();

module.exports.registerStudent = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password, mobile, birthdate } = req.body;

    if (!fullname || !email || !password || !mobile || !birthdate) {
        return res.status(400).json({ errors: [{ msg: "All fields are required" }] });
    }



    const isUserAlreadyExist = await studentModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({ errors: [{ msg: "User already exist" }] })
    }

    const studentId = await generateUniqueUserId();
    if (!studentId) {
        return res.status(500).json({ errors: [{ msg: "Failed to generate student ID" }] });
    }
    // console.log("Generated id", studentId)

    const existingStudent = await studentModel.findOne({ studentId });

    if (existingStudent) {
        return res.status(500).json({ errors: [{ msg: "Duplicate student ID, try again" }] });
    }

    const hashedPassword = await studentModel.hashPassword(password)

    const student = await studentService.createStudent({
        fullname,
        email,
        password: hashedPassword,
        mobile,
        birthdate,
        studentId
    })




    const token = student.generateAuthToken();
    res.status(201).json({ token, student })
}

module.exports.loginStudent = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    const student = await studentModel.findOne({ email }).select('+password');
    if (!student) {
        return res.status(401).json({ errors: [{ msg: "Invalid Email or password" }] })
    }

    const isMatch = await student.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ errors: [{ msg: "Invalid Email or password" }] })
    }

    const token = student.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure:true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(201).json({ messege: 'Login Successfull', token, student })
}

// // module.exports = registerUser;"errors": asifsk.5070

module.exports.getStudentProfile = async (req, res, next) => {
    try {
        return res.status(200).json({ success: true })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports.logoutStudent = async (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies
        
    if (!token) {
        return res.status(400).json({ success: false, message: "Token not found" });
    }
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure:true,
            sameSite: "none",
        
        })
        await blacklistTokenModel.create({ token })
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }


    // res.clearCookie('token') //clear cookie
    // const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    // await blacklistTokenModel.create({token}) //add token to blacklist

    // res.status(200).json({msg:"Logged out successfully"})
}
module.exports.sendVerifyOtp = async (req, res) => {
    try {
        const { studentId } = req.body;

        const student = await studentModel.findById(studentId);

        if (student.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))

        student.verifyOtp = otp;
        student.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await student.save()

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: student.email,
            subject: 'Account Verification OTP',
            // text: `Your otp is : ${otp}`
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",student.email)

        }
        await transporter.sendMail(mailOption)

        res.json({ success: true, message: `Verification OTP sent on Email` })


    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

module.exports.verifyEmail = async (req, res) => {
    const { studentId, otp } = req.body;

    if (!studentId || !otp) {
        return res.json({ success: false, message: "missing details" })
    }

    try {
        const student = await studentModel.findById(studentId)
        if (!student) {
            return res.json({ success: false, message: "User Not Found" })
        }

        if (student.verifyOtp === '' || student.verifyOtp !== otp) {
           return res.json({ success: false, message: "Invalid Otp" })
        }

        if (student.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' })
        }

        student.isAccountVerified = true;
        student.verifyOtp = ''
        student.verifyOtpExpireAt = 0;

        await student.save()


        return res.json({ success: true, message: "Email Verified Successfully" })



    } catch (error) {
        res.json({ success: false, message: error.message })
    }


}

module.exports.sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) { return res.json({ success: false, message: "Email is required" }) }

    try {

        const student = await studentModel.findOne({ email })
        if (!student) {
            return res.json({ success: false, message: "User Not Found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        student.resetOtp = otp;
        student.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        req.session.resetEmail = email; 
        await student.save()

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: student.email,
            subject: 'Password Reset OTP',
            // text: `Your OTP for Resetting Password Is: ${otp}`
            html:`

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">${email}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >${otp}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset otp is only valid for the next 15 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`

        }
        await transporter.sendMail(mailOption)

        return res.json({success:true,message:"OTP Sent to your mail"})


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
    
    
    
}


//reset user password
module.exports.resetPassword = async (req,res)=>{
    const {email,otp,newPassword} = req.body;
    
    if(!email || !otp || !newPassword){
        return res.json({success:false,message:"Email,otp,new password required"})
    }
    if (!req.session.resetEmail || req.session.resetEmail !== email) {
        return res.status(403).json({ success: false, message: "Unauthorized request" });
    }

    try {
        const student = await studentModel.findOne({email})
        if(!student){
           return res.json({success:false,message:'user not found'})
        }

        if(student.resetOtp==="" ||student.resetOtp !== otp){
            return res.json({success:false,message:"Invalid OTP"})
        }

        if(student.resetOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP Expired"})
        }
        
        const hashedPassword =await bcrypt.hash(newPassword,10)
        
        student.password = String(hashedPassword);
        student.resetOtp=''
        student.resetOtpExpireAt=0;
        
        await student.save()
        req.session.destroy(); 
        
        
        return res.json({success:true,message:"Password Has been Changed"})
        
    } catch (error) {
        res.json({ success: false, message: error.message })
        
    }

}

module.exports.updatePayement =  async (req, res) => {
    try {
        const { studentId, amountPaid } = req.body;

        if (!amountPaid || amountPaid <= 0) {
            return res.status(400).json({ error: "Invalid payment amount" });
        }

        // Find student
        const student = await studentModel.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const parsedAmount = Number(amountPaid); // Ensure it's a number
        // console.log(typeof(parsedAmount));

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid payment amount" });
        }
        // Check if payment exceeds total fee
        if (student.feesPaid + parsedAmount > student.totalFee) {
            return res.status(400).json({ error: "Payment exceeds total fee" });
        }


        // Update fees
        student.feesPaid += parsedAmount;
        student.feesRemaining = student.totalFee - student.feesPaid;

        await student.save(); // Save updated student record

        if (student.feesRemaining === 0) {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: student.email,
                subject: "Payment Confirmation",
                // text:"Thank you you paid 1000",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Payment Successful</title>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px; }
                        .container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
                        h1 { color: #4CAF50; }
                        p { font-size: 18px; color: #333; }
                        .details { margin-top: 20px; font-weight: bold; color: #555; }
                        .footer { margin-top: 30px; font-size: 14px; color: #777; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Payment Successful! 🎉</h1>
                        <p>Thank you, <strong>${student.fullname}</strong>, for your payment.</p>
                        <div class="details">
                            <p>Amount Paid: <strong>₹${student.totalFee}</strong></p>
                        </div>
                        <p>Your admission is now confirmed. We are excited to have you onboard!</p>
                        <div class="footer">
                            <p>If you have any questions, contact our support team.</p>
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
        }
        res.status(201).json({
            message: "Payment updated successfully",
            feesPaid: student.feesPaid,
            feesRemaining: student.feesRemaining
        });

    } catch (error) {
        console.error("Payment update error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.payAdmissionFee = async (req, res) => {
    try {
        const { studentId } = req.body;
        // console.log("STUDID",studentId)
        // Find student
        const student = await studentModel.findOne({ _id: studentId });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Check if admission fee is already paid
        if (student.admissionFeePaid) {
            return res.status(400).json({ success: false, message: "Admission fee already paid" });
        }

        // Mark admission fee as paid
        student.admissionFeePaid = true;
        await student.save();

        res.status(201).json({ success: true, message: "Admission fee paid successfully" });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}