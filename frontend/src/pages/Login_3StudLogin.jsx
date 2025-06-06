import React, { useContext, useEffect, useRef, useState } from 'react';
import StaffLoginHeader from '../components/StaffLoginHeader';
import { StudentDataContext } from '../context/StudentContext';
import gsap from 'gsap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";


const Login3StudLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [color, setColor] = useState('bg-green-600')
    const [isLogging, setIsLogging] = useState(false);


    const { student, setStudent, setIsLoggedIn } = useContext(StudentDataContext);

    const submitHandeler = async (e) => {
        e.preventDefault(); // Prevents page reload

        try {
            const studentData = {
                email: email,
                password: password,
            };


            if (!studentData.email || !studentData.password) {
                toast.error("All fields are required!")
                return; // Stop execution if validation fails
            }

            console.log("Submitting:", studentData); // Debugging
            console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/students/Login_8StudRegistrationInfoConfirmContinue`,
                studentData,
                {
                    withCredentials: true, // Include cookies
                }
            );
            setIsLogging(true)

            // console.log(response.status)

            console.log("Request URL:", `${import.meta.env.VITE_BASE_URL}/students/Login_8StudRegistrationInfoConfirmContinue`);

            
            if (response.status === 201) {
                Cookies.set("authToken", "student_logged_in", { expires: 1 });
                const data = response.data;
                toast.success("Logged In")
                setStudent(data.student);
                setIsLoggedIn(true)
                setIsLogging(false)
                localStorage.setItem("StudentLogin","true")
                // localStorage.setItem('student', JSON.stringify(data.student));

                localStorage.setItem('token', JSON.stringify(data.token));


                navigate("/Login_8StudRegistrationInfoConfirmContinue");


            }
            // Clear form fields

        } catch (err) {
            // setMessage(error.message || "Something went wrong!");
            console.log(err)
            if (err.response && err.response.data.errors) {
                toast.error(err.response.data.errors[0].msg)
                // setMessage(err.response.data.errors[0].msg); // Display backend error
            } else {
                console.log(err.response || "Something went wrong!"); // Log error message
                toast.error("Something went wrong. Please try again");
            }
            // setColor('bg-red-800')
            // setPanelOpen(true);
            // setTimeout(() => setPanelOpen(false), 1000);
        }





    };
    const empty = () => {
        setPassword('')
        setEmail('')
    }
    return (
        <div>
            <StaffLoginHeader />

       
            <div className='Staff-Login-portal flex flex-col gap-5'>
                <h1 className='text-2xl text-blue-500'>Student Login</h1>
                <form className='max-w-[650px]' onSubmit={(e) => { submitHandeler(e) }}>
                    <div className="form_container">
                        <div className="form_control">
                            <label htmlFor="registration_id">Email Id <span className='text-red-400'>*</span></label>
                            <input type="email" value={email}
                                onChange={(e) => {
                                    // console.log(e.target.value)
                                    setEmail(e.target.value)
                                }}

                                name="registration_id" placeholder="Enter Email ID" />
                        </div>
                        <div className="form_control">
                            <label htmlFor="Last_name">Password<span className='text-red-400'>*</span></label>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} name="password" placeholder="Enter Password" />
                        </div>
                    </div>
                    <div className="button_container flex gap-5">
                        <button className='font-bold' type='submit'>{isLogging ? "Logging..." : "Click to Login"}</button>
                        <button type='reset' className='font-bold' onClick={() => { empty() }}>Click to Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login3StudLogin;