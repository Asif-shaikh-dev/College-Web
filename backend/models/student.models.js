const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true,
        get: (date) => date.toISOString().split('T')[0]  // Store only YYYY-MM-DD
    },
    password: {
        type: String,
        required: true
    }
    ,
    captcha: {
        type: String,
        required: false
    },
    studentId: { type: String, unique: true, required: true },
    totalFee: { type: Number, default: 1000 },
    feesPaid: { type: Number, default: 0 },
    feesRemaining: { type: Number },
    admissionType: { 
        type: String, 
        enum: ["UG", "PG"], 
       dafault:""
    }, // UG for Undergraduate, PG for Postgraduate

    admissionFee: { 
        type: Number, 
        default: 1000 
    },  // Fixed Admission Fee
    
    admissionFeePaid: { 
        type: Boolean, 
        default: false 
    }, // True if paid, false if not paid
    
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },

    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },
    
    courseSelection: String,
    documents: {
        tenthMarksheet: String,
        twelfthMarksheet: String,
        lc: String,
        casteCertificate: String,
        incomeCertificate: String,
        domicile: String,
        passportPhoto: String,
        adharCard: String,
    },
    status: { type: String, default: "" },
    gender:{type:String},
    mobile2:{type:Number, default:0},
    fatherName:{type:String},
    motherName:{type:String},
    parentContact:{type:Number,default:0},
    currAddress:{type:String},
    tenthBoard:{type:String},
    tenthYear:{type:String},
    tenthPercentage:{type:Number},
    twelfthBoard:{type:String},
    collegeName:{type:String},
    twelfthYear:{type:String},
    stream:{type:String},
    twelfthPercentage:{type:Number},
    subjects: {
        type: [String],  // Array of subjects
        default: []      // Default is an empty array
    },
    ExamSubjects:{
        type: [String],  // Array of subjects
        default: [] 
    },
    ExamSeatNO:{
        type: String,
        default: ''
    }

});

studentSchema.set('toJSON', { getters: true });

studentSchema.pre("save", function (next) {
    this.feesRemaining = this.totalFee - this.feesPaid;
    next();
});

studentSchema.pre("save", function (next) {
    if (this.admissionPaid && this.isModified("admissionPaid")) {
        this.admissionFee = 1000; // Ensure fee remains fixed
    }
    next();
});

studentSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

studentSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

studentSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;