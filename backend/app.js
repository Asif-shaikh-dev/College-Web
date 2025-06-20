const dotenv = require('dotenv')
dotenv.config();
const path = require('path')

const  express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.static(path.join(__dirname, '../frontend/build')));

const cors =require('cors')
const connectDb = require('./db/db')
const studentRoutes= require('./routes/student.routes')
const vridhhiRoutes = require('./routes/Vriddhi.routes')
const hodRoutes = require('./routes/hodRoutes')
const teacherRoutes = require('./routes/teacher.routes')
// const captainRoutes= require('./routes/captain.routes')


connectDb()
app.set("trust proxy", 1);


app.use(cors({
    origin: ['https://college-web-frontend-2.onrender.com','http://localhost:5173','http://localhost:5174','http://localhost:5175','http://192.168.161.103:5173'], // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
  

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
 // make sure it's at the top

// Serve /uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => res.send('Hello World!'))
app.use('/students',studentRoutes)

app.use('/vriddhi',vridhhiRoutes)
app.use('/hod',hodRoutes)
app.use('/teacher',teacherRoutes)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });

// app.use('/captains',captainRoutes)
module.exports=app;