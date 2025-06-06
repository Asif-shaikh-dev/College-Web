const port = process.env.PORT || 4000;
const http = require('http')
const app = require('./app')
const express = require('express')
const server = http.createServer(app);


// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// const localImagePath = path.join(__dirname, "uploads", "1742811610055-personimg.jfif");
// console.log("✅ College Logo Found!", localImagePath);
//Allow Access to :-
//http://localhost:4000/uploads/document.pdf

server.listen(port,()=>{
    console.log(`Server is listening on PORT ${port}`);
    
})