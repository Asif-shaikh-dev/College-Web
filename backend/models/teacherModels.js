const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
  department: String,
  subject: String,
  approved: { type: String, default: 'pending' }, // Approval status
  });
  
 const Teacher = mongoose.model("Teacher", teacherSchema);
  
 module.exports = Teacher;