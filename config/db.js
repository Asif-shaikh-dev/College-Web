const mongoose = require('mongoose')
require('dotenv').config();

function connectDb(){
    mongoose.connect(process.env.DB_CONNECT,{serverSelectionTimeoutMS: 5000})
        .then(()=>{
            console.log(mongoose.connection.readyState);
            console.log('Connected to db');
            
        }).catch((error)=>{
            console.log("Error Occured TO connect to db ",error);
            
        })
}

module.exports = connectDb