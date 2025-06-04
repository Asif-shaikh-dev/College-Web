import React, { useContext, useEffect, useRef, useState } from 'react';
import StaffLoginHeader from '../components/StaffLoginHeader';
import '../CssComponents/Login_2StudRegisterInfo.css';
import LoginFooter from '../components/Login-footer';
import { StudentDataContext } from '../context/StudentContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login_2StudRegistrationInfo = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [captcha, setCaptcha] = useState('');
    
    const [color,setColor] = useState('bg-green-600')


    const { student, setStudent } = useContext(StudentDataContext);
    // console.log(StudentDataContext)
    const navigate = useNavigate();

    // const submitHandeler =async(e) => {
    //     e.preventDefault(); // Prevents the page from reloading

    //     const studentData = {
    //         email: email,
    //         password: password,
    //         fullname: name,
    //         mobile: mobile,
    //         birthdate: birthdate,
    //         captcha: captcha
    //     }
    //     // console.log(userData);
    //     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/students/login_2StudRegistrationInfo`, studentData);
    //     if(response.status === 200){
    //         const data = response.data;
    //         // console.log(data);
    //         setStudent(data.student);
    //         localStorage.setItem('token', JSON.stringify(data.token));
    //         navigate('/');

    //     }
    //     setEmail('');
    //     setPassword('');
    // }
    const submitHandeler = async (e) => {
        e.preventDefault(); // Prevents page reload

        try {
            const studentData = {
                email: email,
                password: password,
                fullname: name,
                mobile: mobile,
                birthdate: birthdate,
                captcha: captcha
            };


            if (!studentData.email || !studentData.password ||!studentData.birthdate  ||!studentData.fullname ||!studentData.mobile ||!studentData.captcha ) {
            //     setMessage("All fields are required!");
            //  setColor('bg-red-800')

            //     setPanelOpen(true);
            //     setTimeout(() => setPanelOpen(false), 2000);
                toast.error("All fields are required!")
                return; // Stop execution if validation fails
            }

            console.log("Submitting:", studentData); // Debugging
            console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/students/login_2StudRegistrationInfo`,
                studentData,
                {
                    withCredentials: true, // Include cookies
                }
            );

            
                        // console.log(response.status)

            console.log("Request URL:", `${import.meta.env.VITE_BASE_URL}/students/login_2StudRegistrationInfo`);

            if (response.status === 201) {
                const data = response.data;
                setStudent(data.student);
                localStorage.setItem('token', JSON.stringify(data.token));
                toast.success("Registration Successful");
                navigate("/login_3StudLogin");

                // setColor('bg-green-800')
                // setMessage("Registration Successful");
                // setPanelOpen(true); // Show panel
                // setTimeout(() => {
                //     setPanelOpen(false);
                // }, 2000);

            }else{
                toast.error("Registration Failed")
                // setMessage("Registration Failed");
                // setPanelOpen(true); // Show panel
                // setTimeout(() => {
                //     setPanelOpen(false);
                // }, 2000);
            }

            // Clear form fields
            
        } catch (err) {
            if (err.response && err.response.data.errors) {
                toast.error(err.response.data.errors[0].msg)
                // setMessage(err.response.data.errors[0].msg); // Display backend error
            } else {
                toast.error("Something went wrong. Please try again.")
                // setMessage("Something went wrong. Please try again.");
            }
            // setMessage(error.msg || "Something went wrong!");
        //     setColor('bg-red-800')
        //      setPanelOpen(true);
        // setTimeout(() => setPanelOpen(false), 2000);
        }





    };



    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const [message, setMessage] = useState("Registration Successful");
    useEffect(() => {
        if (panelOpen) {
            gsap.fromTo(
                panelRef.current,
                { x: "100%", opacity: 0 },
                { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
            );
        } else {
            gsap.to(panelRef.current, {
                x: "100%",
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
            });
        }
    }, [panelOpen]);






    return (
        <div className=' '>
            <StaffLoginHeader />
            
            {panelOpen && (
                <div
                    ref={panelRef}
                    className={`fixed  registration-success-panel top-5 right-5 ${color} text-white font-sans rounded shadow-lg transition-opacity duration-500`} >
                    {message}
                </div>
            )}
            <div className='info-body'>
                <form className='max-w-[700px]' onSubmit={(e) => {
                    submitHandeler(e);
                }}>
                    <h2 className='text-red-500 text-xl'>Important Instructions for Students.</h2>
                    <ul className='text-sm stud-login-ul'>
                        <li> Please enter your mobile number and email id carefully.</li>
                        <li>You will receive OTP on your mobile number and email id after filling this form to verify your details.</li>
                        <li>
                            You will receive OTP on your mobile number and email id after filling this form to verify your details.
                        </li>
                        <li> OTP received on your mobile number and email id will get expired in 30 minutes.</li>
                        <li> If you have received OTP & didn't use it within 30 minutes, use "Forget ID" link in Login Menu page to activate your account</li>
                        <li> Please keep your mobile switched on and in network range to receive OTP quickly, please check for OTP email in your email's inbox and spam folders.</li>
                        <li>
                            If you have already tried registering and did not receive any SMS/OTP, you can recover your account using "Forget ID" link in login menu.
                        </li>
                        <li className='text-blue-400'>8. Special symbols such as (#, !, $, &, *, .,) are not allowed in password.</li>


                    </ul>

                    <div className="form_container">
                        <div className="form_control">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Full Name (As per Marksheet)"
                            />
                        </div>
                        <div className="form_control">
                            <label htmlFor="email">Email ID</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                        </div>
                        <div className="form_control">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                id="mobile"
                                placeholder="Enter Mobile Number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div className="form_control">
                            <label htmlFor="birthdate">Birthdate</label>
                            <input
                                type="date"
                                name="birthdate"
                                id="birthdate"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)} />
                        </div>
                        <div className="form_control">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                        </div>
                        <div className="form_control">
                            <label htmlFor="captcha">Captcha</label>
                            <input
                                type="text"
                                name="captcha"
                                id="captcha"
                                placeholder="Enter Captcha"
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)} />
                        </div>
                    </div>

                    <div className="button_container flex gap-5">
                        <button type="submit" className='font-bold'  >Click to Register</button>
                    </div>
                </form>


            </div>
            <LoginFooter />
        </div>
    );
};

export default Login_2StudRegistrationInfo;