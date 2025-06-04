const studentModel = require('../models/student.models');

module.exports.createStudent = async ({ fullname, email, password, mobile, birthdate,studentId }) => {
    if (!fullname || !email || !password || !mobile || !birthdate) {
        throw new Error('All fields are required');
    }

    const student = await studentModel.create({
        fullname,
        email,
        password,
        mobile,
        birthdate,
        studentId
    });

    return student;
};