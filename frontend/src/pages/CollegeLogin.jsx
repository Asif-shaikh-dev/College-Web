import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CollegeLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')

    const navigate = useNavigate();
    const submitHandeler = async (e) => {
        e.preventDefault()
        try {
            const loginDdata = {
                email: email,
                password: password,
            };
            
            if (!loginDdata.email || !loginDdata.password) {
                toast.error("All fields are required!")
                return; // Stop execution if validation fails
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/vriddhi/login`,
                loginDdata,
                {
                    withCredentials: true, // Include cookies
                }
            );
            // console.log(response)
            const data = response.data;
            // console.log(data)

            if (response.status == 201) {
                
                if (data.role === 'Owner') {
                    toast.success("Login Confirmed!")
                    localStorage.setItem("OwnertryToAccess", "true");
                    navigate('/application-list')
                    // window.location.href = "http://localhost:5174/";
                } else {
                    toast.error('Only Owner Aloowed')
                    navigate('/')
                }

            }

        } catch (error) {
            // toast.error(error.response.data.message)
            // console.error("Login Error:", error);
            if (error.response) {
                // console.error("Response Data:", error.response.data);
                // console.error("Response Status:", error.response.status);
                toast.error(error.response.data.message || "Login failed!");
            } else if (error.request) {
                // console.error("Request Made But No Response:", error.request);
                toast.error("No response from server!");
            } else {
                // console.error("Error Message:", error.message);
                toast.error(error.message);
            }
        }
    }

    return (
        <div className='flex items-center justify-center bg-black h-screen w-screen'>

            <form onSubmit={(e) => submitHandeler(e)} action="" className='h-[70%] w-[80%] flex flex-col items-center justify-evenly border border-gray-400'>
                <div className='w-full  bg-transparent flex items-center justify-center'>
                    <h1 className='text-4xl bg-gradient-to-br from-[#818CF8] to-purple-400 text-transparent bg-clip-text font-medium'>Abeda Inamdar Senior College <span className='text-yellow-200'>Vriddhi Login</span> </h1>
                </div>

                <div className='w-full  bg-transparent  flex flex-col gap-3 items-center justify-evenly'>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='h-20 w-[80%] bg-transparent' />
                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' className='h-20 w-[80%] bg-transparent' />
                </div>
                <button className='text-blue-500 bg-white rounded-full w-20 h-10 cursor-pointer '>Login</button>

            </form>

        </div>
    )
}

export default CollegeLogin