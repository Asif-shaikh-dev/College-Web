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

    const [color, setColor] = useState('bg-green-600')


    const { student, setStudent } = useContext(StudentDataContext);
    // console.log(StudentDataContext)
    const navigate = useNavigate();


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


            if (!studentData.email || !studentData.password || !studentData.birthdate || !studentData.fullname || !studentData.mobile || !studentData.captcha) {

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



            } else {
                toast.error("Registration Failed")

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
        <div className=' bg-red-400'>
            <StaffLoginHeader />

            {panelOpen && (
                <div
                    ref={panelRef}
                    className={`fixed  registration-success-panel top-5 right-5 ${color} text-white font-sans rounded shadow-lg transition-opacity duration-500`} >
                    {message}
                </div>
            )}
            <div
                className="info-body w-screen"
                style={{
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'start',
                }}
            >
                <form
                    onSubmit={(e) => submitHandeler(e)}
                    style={{
                        width: '100%',
                        maxWidth: '700px',
                        padding: '20px',
                        backgroundColor: '#0000',
                        borderRadius: '8px',
                    }}
                >
                    <h2
                        className="text-red-500 text-xl"
                        style={{ marginBottom: '16px', fontWeight: '600' }}
                    >
                        Important Instructions for Students.
                    </h2>

                    <ul
                        className="text-sm stud-login-ul"
                        style={{
                            marginBottom: '24px',
                            paddingLeft: '20px',
                            lineHeight: '1.6',
                        }}
                    >
                        <li>Please enter your mobile number and email id carefully.</li>
                        <li>You will receive OTP on your mobile number and email id after filling this form to verify your details.</li>
                        <li>OTP will expire in 30 minutes.</li>
                        <li>If OTP expires, use "Forget ID" link on Login page to activate account.</li>
                        <li>Check for OTP in inbox/spam folders.</li>
                        <li>If you already registered and didn’t receive SMS/OTP, use "Forget ID".</li>
                        <li className="text-blue-400">
                            8. Special symbols like (#, !, $, &, *, .,) are not allowed in password.
                        </li>
                    </ul>

                    <div
                        className="form_container"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                            marginBottom: '24px',
                        }}
                    >
                        <div className="form_control" style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Full Name (As per Marksheet)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ padding: '8px', marginTop: '6px' }}
                            />
                        </div>

                        <div className="form_control" style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="email">Email ID</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ padding: '8px', marginTop: '6px' }}
                            />
                        </div>

                        <div className="form_control" style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="mobile">Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                id="mobile"
                                placeholder="Enter Mobile Number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                style={{ padding: '8px', marginTop: '6px' }}
                            />
                        </div>

                        <div className="form_control" style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="birthdate">Birthdate</label>
                            <input
                                type="date"
                                name="birthdate"
                                id="birthdate"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                style={{ padding: '8px', marginTop: '6px',width:'100%' }}
                            />
                        </div>

                        <div className="form_control" style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ padding: '8px', marginTop: '6px' }}
                            />
                        </div>

                        <div className="form_control" style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="captcha">Captcha</label>
                            <input
                                type="text"
                                name="captcha"
                                id="captcha"
                                placeholder="Enter Captcha"
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)}
                                style={{ padding: '8px', marginTop: '6px' }}
                            />
                        </div>
                    </div>

                    <div
                        className="button_container"
                        style={{
                            marginTop: '16px',
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <button
                            type="submit"
                            className="font-bold"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2563eb',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Click to Register
                        </button>
                    </div>
                </form>
            </div>


            <LoginFooter />
        </div>
    );
};

export default Login_2StudRegistrationInfo;