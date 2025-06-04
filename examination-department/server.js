const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./db/db');
// const studentRoute = require('./routes/student.routes');
const examRoute = require('./routes/examroute');
// Middleware
const mongoose = require('mongoose')
require('dotenv').config();

app.use(cors());
app.use(express.json()); // ⬅️ This is required to parse JSON requests
app.use(express.urlencoded({ extended: true }));

connectDB()
// Routes
app.get('/', (req, res) => {
    res.send('Server is running...');
});
app.use('/exam',examRoute)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});