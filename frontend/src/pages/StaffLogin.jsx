import React from 'react';
import StaffLoginHeader from '../components/StaffLoginHeader';
import '../CssComponents/StaffLogin.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import StudentContext from '../context/StudentContext';
import { StudentDataContext } from '../context/StudentContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';




const StaffLogin = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const resetRequested = localStorage.getItem("resetRequested");
      if (!resetRequested) {
        navigate("/staff-login"); // Redirect if no request was made
      }
    }, []);

    const [isLogging,setIsLogging] = useState(false);
    const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP & Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
   const{changePassDiv,setChangePassDiv}= useContext(StudentDataContext)

    const sendOtp = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/students/send-reset-otp`, { email });
            // setMessage(response.data.message);
            
            if (response.data.success){
                toast.success(response.data.message);
                setStep(2);
            } else{
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.success("Something went wrong. Try again.");
            console.log("Error int the sendOtp function:", error);
            // setMessage("Something went wrong. Try again.");
        }
        setLoading(false);
    };

    const resetPassword = async () => {
        setLoading(true);
        localStorage.setItem("resetRequested", "true");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/students/reset-password`, {
                email,
                otp,
                newPassword,
            });
            setMessage(response.data.message);
            if (response.data.success) {
                toast.success(response.data.message);
                setChangePassDiv(false);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            setMessage("Failed to reset password.");
        }
        setLoading(false);
        localStorage.setItem("resetRequested", "false");

        // setChangePassDiv(false)
    };

 

    const [userType, setUserType] = useState("");
    const [email2, setEmail2] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      setIsLogging(true);
  
      if (!userType || !email2 || !password) {
        toast.error("All fields are required. bro");  
        setError("All fields are required.");
        return;
      }
  
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/teacher/login`, {
          userType,
          email2,
          password,
        },{withCredentials:true});
        
        if (response.status ===201) {
          // alert("Login successful!");
          toast.success("Login Successful!")
          setIsLogging(false);
          if(userType==='HOD'){
            localStorage.setItem("HODLoggedINBro", "HOD");
            navigate('/hod-dashboard');
          }else{
            localStorage.setItem("teacherLoggedINBro", "HOD");
            navigate('/teacher-dashboard');
          }
          // Redirect or store session info
        } else {
          toast.error("Invalid credentials");
          setError(response.data.message || "Invalid credentials");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Login failed. Please try again.");
        setError("Login failed. Please try again.");
      }
    };
  
    return (
        <div >
            <StaffLoginHeader />
            { changePassDiv &&
              <div onClick={()=>{setChangePassDiv(false)}} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
        
                {step === 1 ? (
                  <div className='step-1-otp flex flex-col'>
                    <label className=" text-black mb-2">Enter your Email:</label>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="enter-email-otp w-full px-3 py-2 border bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={sendOtp}
                      disabled={loading}
                      className=" self-center otp-button3  bg-blue-500  cursor-pointer hover:bg-blue-600 text-white py-2 mt-4 rounded-md transition"
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </div>
                ) : (
                  <div className='step-1-otp flex flex-col'>
                    <label className="block text-black mb-2">Enter OTP:</label>
                    <input
                      type="text"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-black enter-email-otp px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
        
                    <label className="block text-gray-700 mt-4 mb-2">New Password:</label>
                    <input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-black enter-email-otp px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
        
                    <button
                      onClick={resetPassword}
                      disabled={loading}
                      className="otp-button3 bg-green-500 cursor-pointer self-center hover:bg-green-600 text-white py-2 mt-4 rounded-md transition"
                    >
                      {loading ? "Resetting Password..." : "Reset Password"}
                    </button>
                  </div>
                )}
        
                {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
              </div>
            </div>
            }
            <div className='Staff-Login-portal flex flex-col gap-5'>
                <h1 className='text-2xl text-blue-500'>Teacher/Academic staff portal Login</h1>
                <form className='max-w-[650px]' onSubmit={handleLogin}>
                    <div className="form_container">
                        <div className="form_control">
                            <label for="Job_role">HOD/Teacher</label>
                            <select id="Job_role" value={userType} onChange={(e) => {setUserType(e.target.value);}} >
                                <option value="">Select User Type</option>
                                <option value='HOD' >H.O.D</option>
                                <option value='teacher'>Teacher</option>
                            </select>
                        </div>
                        <div className="form_control">
                            <label for="first_name">User ID(Email ID)</label>
                            <input value={email2} type="email" onChange={(e)=>{setEmail2(e.target.value);}} name="email" placeholder="Enter ID" />
                        </div>
                        <div className="form_control">
                            <label for="Last_name">Password</label>
                            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value);}} name="password" placeholder="Enter Password" />
                        </div>
                    
                    </div>
                    <div className="button_container flex gap-5">
                        <button className='font-bold' >{isLogging? "Logging.." : "Click to login"}</button>
                        <button className='font-bold'>Click to Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StaffLogin;