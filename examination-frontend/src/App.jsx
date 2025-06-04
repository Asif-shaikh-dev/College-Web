import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'



import axios from 'axios'
import StudentLogin from './pages/studLogin';
import ExamHead from './pages/examHead';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {


  const navigate = useNavigate(); // ✅ Import useNavigate for redirection



  return (
    <>
  
      <ToastContainer />
    <Routes>
      <Route path='/' element={<StudentLogin />} />
      <Route path='/special-page' element={<ExamHead />} />
      
      
    

     
    </Routes>
    </>


  )
}

export default App