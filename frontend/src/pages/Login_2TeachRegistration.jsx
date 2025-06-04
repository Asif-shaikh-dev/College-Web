import React, { useState } from 'react';
import StaffLoginHeader from '../components/StaffLoginHeader';
import LoginFooter from '../components/Login-footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login2TeachRegistration = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [subject, setSubject] = useState("");
    const [loading, setisLoading] = useState(false)

    // Department-wise subjects
    const subjectOptions = {
        "BSC CS": ["Mathematics", "RDBMS", "C++", "Python", "Java"],
        "BBA": ["Business Studies", "Economics", "Marketing", "Finance"],
        "BCom": ["Accounting", "Business Law", "Banking", "Taxation"],
        "BA": ["History", "Political Science", "Sociology", "Psychology"],
        "BSC": ["Physics", "Chemistry", "Mathematics", "Biology"],
    };
    //   const courseSubjects = {
    //     "BSC CS": {
    //         default: ["C++", "Java", "DBMS"],
    //         optional: ["Mathematics", "Statistics"]
    //     },
    //     "BBA": {
    //         default: ["Business Studies", "Economics"],
    //         optional: ["Marketing", "Finance"]
    //     },
    //     "BCom": {
    //         default: ["Accounting", "Business Law"],
    //         optional: ["Banking", "Taxation"]
    //     },
    //     "BA": {
    //         default: ["History", "Political Science"],
    //         optional: ["Sociology", "Psychology"]
    //     },
    //     "BSC": {
    //         default: ["Physics", "Chemistry"],
    //         optional: ["Mathematics", "Biology"]
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true)
        try {
            const response = await axios.post("http://localhost:4000/teacher/register", {
                name,
                email,
                mobile,
                password,
                department,
                subject,
            });
            if (response.data.success) {
                toast.success(response.data.message)

            } else {

                toast.error(response.data.message)
            }


        } catch (error) {
            toast.error('response.data.message')

        } finally {
            setisLoading(false)
        }
    };

    return (
        <div className=' '>
            <StaffLoginHeader />

            <div className='info-body'>
                <form className='max-w-[700px]' onSubmit={handleSubmit}>
                    <h2 className='text-red-500 text-xl'>Important Instructions for Teachers.</h2>
                    <ul className='text-sm stud-login-ul'>
                        <li> Please enter your mobile number and email id carefully.</li>

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
                        {/* <div className="form_control">
                            <label htmlFor="captcha">Department</label>
                            <input
                                type="text"
                                name="captcha"
                                id="captcha"
                                placeholder="Enter Captcha"
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)} />
                        </div> */}
                        <div className="form_control">
                            <label className="block text-gray-700">Department</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                                value={department}
                                onChange={(e) => {
                                    setDepartment(e.target.value);
                                    setSubject(""); // Reset subject when department changes
                                }}
                            >
                                <option value="">Select Department</option>
                                {Object.keys(subjectOptions).map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form_control">
                            <label className="block text-gray-700">Subject</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                disabled={!department}
                            >
                                <option value="">Select Subject</option>
                                {department &&
                                    subjectOptions[department].map((sub) => (
                                        <option key={sub} value={sub}>
                                            {sub}
                                        </option>
                                    ))}
                            </select>
                        </div>

                    </div>

                    <div className="button_container flex gap-5">
                        <button type="submit" className='font-bold' >{loading ? 'Registering..':'Register'}</button>
                    </div>
                </form>


            </div>
            <LoginFooter />
        </div>
    );
};

export default Login2TeachRegistration;