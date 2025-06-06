import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const StudentDataContext = createContext();


const StudentContext = ({ children }) => {
  const navigate = useNavigate()
      const [selectedMenu, setSelectedMenu] = useState("home");
  
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const backendUrl = import.meta.env.VITE_BASE_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [changePassDiv, setChangePassDiv] = useState(false);
    const [student, setStudent] = useState({
        studentId: "",
        fullname: "",
        email: "",
        mobile: "",
        birthdate: "",
        totalFee:0,
        feesPaid:0,
        feesRemaining:0,
        admissionType:"",
        admissionFee:0,
        admissionFeePaid:false,
        fullName: "",
        dob: "",
        gender: "",
        mobile2: "",
    
        fatherName: "",
        motherName: "",
        parentContact: "",
        currAddress: "",
        tenthBoard: "",
        tenthYear: "",
        tenthPercentage: "",
        collegeName: "",
        stream: "",
        twelfthPercentage: "",
        courseSelection: "",
        documents: {
            tenthMarksheet: null,
            twelfthMarksheet: null,
            lc: null,
            casteCertificate: null,
            incomeCertificate: null,
            domicile: null,
            passportPhoto: null,
            adharCard: null,
        },

        
    })
    
 const getUserData = async () => {
     try {
       const { data } = await axios.get(`${backendUrl}/students/data`, { withCredentials: true })
       console.log("User Data Response:", data);
       data.success ? setStudent(data.studentData) : toast.error(data.message)
 
     } catch (error) {
        navigate('/')
       toast.error(error.message || "Something went wrong in getting User Data")
     }
   }
 
   const getAuthState = async () => {
     try {
       const { data } = await axios.get(`${backendUrl}/students/is-auth`,{ withCredentials: true })
       if (data.success) {
         setIsLoggedIn(true)
         getUserData()
       }else{
          console.log("Not logged in")
        

      }
      
    } catch (error) {
      console.error("Error in getting auth state:", error.errors.msg);
       toast.error(error.message)
     }
   }
 
   useEffect(() => {
     getAuthState();
   }, [])

  


    const logout = () => {
        setStudent({ email: "", fullname: "" });
        Cookies.remove("authToken");
        Cookies.remove('token');
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem("student");
        setStudent(null); // Reset student state
    };
    return (

        <StudentDataContext.Provider value={{ backendUrl,changePassDiv,setChangePassDiv,student, setStudent, logout, isLoggedIn, setIsLoggedIn ,isAuthenticated, setIsAuthenticated,selectedMenu,setSelectedMenu}}>
            {children}
        </StudentDataContext.Provider>

    )
}

export default StudentContext;

export const useStudentData = () => {
    const context = React.useContext(StudentDataContext);
    if (!context) {
        throw new Error('useStudentData must be used within a StudentContext');
    }
    return context;
};