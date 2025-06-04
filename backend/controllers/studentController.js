import studentModel from "../models/student.models.js";


export const getStudentData = async(req,res)=>{
    try {
        const {studentId} = req.body;

        const student = await studentModel.findById(studentId)
        if(!student){
           return res.json({success:true,message:"Student not found"})
        }
        
        return res.json({
            success:true,
            studentData:{
                studentId:student.studentId,
                fullname:student.fullname,
                isAccountVerified:student.isAccountVerified,
                password:student.password,
                email:student.email,
                mobile:student.mobile,
                birthdate:student.birthdate,
                feesRemaining:student.feesRemaining,
                totalFee:student.totalFee,
                feesPaid:student.feesPaid,
                admissionType:student.admissionType,
                admissionFee:student.admissionFee,
                admissionFeePaid:student.admissionFeePaid,
                

                dob: student.dob || "",
                gender: student.gender || "",
                fatherName: student.fatherName || "",
                motherName: student.motherName || "",
                parentContact: student.parentContact || "",
                currAddress: student.currAddress || "",
                tenthBoard: student.tenthBoard || "",
                tenthYear: student.tenthYear || "",
                tenthPercentage: student.tenthPercentage || "",
                twelfthBoard: student.twelfthBoard || "",
                collegeName: student.collegeName || "",
                stream: student.stream || "",
                twelfthPercentage: student.twelfthPercentage || "",
                courseSelection: student.courseSelection || "",
                status: student.status || "",
                modile2: student.mobile2 || "",
                // Documents should not be nullified if they exist
                documents: {
                    tenthMarksheet: student.documents?.tenthMarksheet || null,
                    twelfthMarksheet: student.documents?.twelfthMarksheet || null,
                    lc: student.documents?.lc || null,
                    casteCertificate: student.documents?.casteCertificate || null,
                    incomeCertificate: student.documents?.incomeCertificate || null,
                    domicile: student.documents?.domicile || null,
                    passportPhoto: student.documents?.passportPhoto || null,
                    adharCard: student.documents?.adharCard || null,
                },
            }
        })

    } catch (error) {
       return res.json({success:false,message:error.message})
    }
}