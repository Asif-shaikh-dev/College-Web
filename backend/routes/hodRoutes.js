const express = require('express')
const router = express.Router()

const HODModels = require('../models/HODModels');
const Teacher = require('../models/teacherModels');


router.post("/register", async (req, res) => {
    const { name, email, department, password } = req.body;

    const existingHOD = await HODModels.findOne({ department });
    if (existingHOD) {
        return res.status(400).json({ message: "HOD already exists for this department" });
    }

    await HODModels.create({ name, email, department, password });
    res.status(201).json({ message: "HOD registered successfully" });
});


router.get("/pending-teachers/:department", async (req, res) => {
    const { department } = req.params;
    const teachers = await Teacher.find({ department, approved: "pending" });

    res.status(200).json(teachers);
});


router.post("/approve-teacher", async (req, res) => {
    const { teacherId } = req.body;

    await Teacher.findByIdAndUpdate(teacherId, { approved: "approved" });
    res.status(200).json({ message: "Teacher approved" });
});

module.exports = router;