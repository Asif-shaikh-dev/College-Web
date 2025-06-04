import React, { useContext } from 'react';
import '../CssComponents/studentLoginHeader.css';
import { StudentDataContext } from '../context/StudentContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentLoginHeader = () => {
    const navigate =useNavigate()
    const {student,setStudent,isLoggedIn,setIsLoggedIn,backendUrl,selectedMenu,setSelectedMenu } = useContext(StudentDataContext)

    const handleLogout = async() => {
        try {
            
            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/students/logout`,{},{withCredentials:true})
            // console.log(data)
            toast.success("Logged Out")
            localStorage.removeItem('StudentLogin')
            data.success && setIsLoggedIn(false);
            data.success && setStudent(false)
            navigate('/');


        } catch (error) {
            console.error("Logout Error:", error.response?.data || error.message);
            toast.error(error.message)
        }
        // setIsLoggedIn(false)
        // logout();
        // navigate('/login_3StudLogin'); // Redirect to login page
    };

    
    return (
        <header>
            <div className='sheader w-full  bg-transparent text-white font-light flex justify-around text-sm'>
                <div className='welcome-msg'>Welcome {student?.fullname || ""} ({student?.email || ""})</div>
                <div className='support-id font-bold '>Student Support Email ID : studentsupport@vriddhisoftware.com</div>
                <div className='logout-changepass '>
                    <ul className='flex gap-3 tracking-wider'>
                        <li onClick={()=>{setSelectedMenu('home')}} className="cursor-pointer transition-colors duration-300 hover:text-red-400">
                            Profile
                        </li>
                        <li onClick={handleLogout} className="cursor-pointer text-red-400 transition-colors duration-300 hover:text-red-500">
                            Log Out
                        </li>

                    </ul>
                </div>
            </div>
        </header>
    );
};

export default StudentLoginHeader;