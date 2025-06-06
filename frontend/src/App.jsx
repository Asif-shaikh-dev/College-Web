import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Start from './pages/Start.jsx'
import './App.css'
import AboutAISC from './pages/AboutAISC.jsx'
import StaffLoginHeader from './components/StaffLoginHeader.jsx'
import StaffLogin from './pages/StaffLogin.jsx'
import Login_1StudRegistrationInfo from './pages/Login_1StudRegistrationInfo.jsx'
import Login_2StudRegistrationInfo from './pages/Login_2StudRegistrationInfo.jsx'
import Login_8StudRegistrationInfoConfirmContinue from './pages/Login_8StudRegistrationInfoConfirmContinue.jsx'
import StudentLogin from './pages/Login_3StudLogin.jsx'
import StudChangePass from './pages/StudChangePass.jsx'
import ErrorBoundary from './components/ErrorBoundry.jsx'

import axios from 'axios'
import { StudentDataContext } from './context/StudentContext.jsx'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollegeLogin from './pages/CollegeLogin.jsx'
import ApplicationList from './pages/ApplicationList.jsx'
import HodDashboard from './pages/HodDashBoard.jsx'
import TeacherRegister from './pages/Login_2TeachRegistration.jsx'
import TeacherDashBoard from './pages/TeacherDashBoard.jsx'

const App = () => {
  const {isAuthenticated} = useContext(StudentDataContext)

  const navigate = useNavigate(); // ✅ Import useNavigate for redirection



  return (
    <>
      <ToastContainer />
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/about-AISC' element={<AboutAISC />} />
      <Route path='/college-login' element={<CollegeLogin />} />
      <Route path='/staff-login' element={<StaffLogin />} />
      <Route path='/login_1StudRegisterInfo' element={<Login_1StudRegistrationInfo />} />
      <Route path='/login_2StudRegistrationInfo' element={<Login_2StudRegistrationInfo />} />
      <Route path='/login_3StudLogin' element={<StudentLogin />} />
      <Route path='/hod-dashboard' element={<HodDashboard />} />
      <Route path='/teacher-dashboard' element={<TeacherDashBoard />} />
      <Route path='/Login_2Teachregistration' element={<TeacherRegister />} />
      

      <Route path='/Login_8StudRegistrationInfoConfirmContinue' element={
        <ErrorBoundary>
        <Login_8StudRegistrationInfoConfirmContinue />
        </ErrorBoundary>
        } />
        <Route path='/application-list' element={
          <ErrorBoundary>
          <ApplicationList />
          </ErrorBoundary>
          } />

      
      <Route path='/change-password' element={<StudChangePass />} />
      

      {/* Redirect logged-in users from login page */}
      <Route
        path="/login_3StudLogin"
        element={isAuthenticated ? <Navigate to="/Login_8StudRegistrationInfoConfirmContinue" replace /> : <StudentLogin />}
      />

    

     
    </Routes>
    </>


  )
}

export default App