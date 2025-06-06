import React, { useEffect } from 'react';

import '../CssComponents/staffLoginHeader.css'
import { Link } from 'react-router-dom';
import { StudentDataContext } from '../context/StudentContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const StaffLoginHeader = () => {
    const { changePassDiv, setChangePassDiv } = useContext(StudentDataContext)

    return (
        <div className='staff-login '>
            <nav className='h-10 bg-blue-950 text-gray-300 text-xs w-full flex items-center font-semibold '>
                <p>Call Us : / prin-aisc@azamcampus.org /</p>
            </nav>


            <div className='header'>
                <div style={{ padding: '10px' }} className='text-white h-10 font-bold text-lg text-center md:text-left  md:text-sm '>M.C.E. Society</div>
                <div style={{ marginBottom: '12px', padding: '10px' }} className='text-yellow-200 heading2 text-sm  md:font-normal md:text-xl ' >Abeda Inamdar Senior College Of Arts, Science & Commerce (Autonomous)</div>


                <div className='text-white  '>
                    <div className="staff-container md:flex items-center  md:w-[100%]  justify-end">
                        <ul style={{ padding: '10px' }} className='flex flex-wrap gap-3 md:gap-5  justify-around  w-[100%]  md:h-full md:w-[70%]  '>
                            <Link to='/'>
                                <li style={{marginTop:'0.01rem',height:'24px'}} className='flex justify-center items-center cursor-pointer  '>
                                    <p className='text-[0.9rem] md:text-[1.01rem]'>Home</p>
                                </li>
                            </Link>



                            <li style={{padding:'2px'}} className=' cursor-pointer relative     '>
                                <div className='flex items-center justify-center '>
                                    <p className='text-[0.9rem]  md:text-[1.01rem]'>Login</p>
                                    <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </div>
                                <div className='btn-content2 text-xs md:text-[1.01rem]'>
                                    <Link to='/login_1StudRegisterInfo'>
                                        <div className="option2">Student Register</div>
                                    </Link>
                                    <Link to='/login_3StudLogin'>
                                        <div className="option2">Student Login</div>
                                    </Link>
                                    <div className="option2">Staff Login(College Login)</div>
                                    <Link to='/Login_2Teachregistration'>
                                        <div className="option2">Teacher Registeration</div>
                                    </Link>
                                    <Link to='/staff-login'>
                                        <div className="option2">Teacher Login</div>
                                    </Link>
                                    {/* <div className="option2">Forget Id (Student)</div> */}
                                    <div className="option2" onClick={() => { setChangePassDiv(true) }}>Forget Password (Student)</div>
                                </div>

                            </li>
                            <li style={{padding:'2px'}} className=' cursor-pointer  relative  '>
                                <div className='flex items-center justify-center '>
                                    <p className='text-[0.9rem]  md:text-[1.01rem]'>Academic Details</p>
                                    <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </div>
                                <div className='btn-content2 text-xs md:text-[1.01rem]'>
                                    <div className="option2">Programs</div>
                                    <div className="option2">Fees Structure</div>
                                    <div className="option2">Staff Login(College Login)</div>
                                    <div className="option2">Teacher Registeration</div>

                                </div>

                            </li>
                            <li style={{padding:'2px'}} className=' cursor-pointer relative '>
                                <div className='flex items-center justify-center '>
                                    <p className='text-[0.9rem]  md:text-[1.01rem]'>Online OPAC</p>
                                    <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </div>
                                <div className='btn-content2 text-xs md:text-[1.01rem]'>
                                    <div className="option2">College OPAC</div>
                                    <div className="option2">Campus OPAC</div>

                                </div>

                            </li>
                            <li style={{padding:'2px'}} className='cursor-pointer relative  '>
                                <div className='flex items-center justify-center '>
                                    <p className='text-[0.9rem]  md:text-[1.01rem]'>About Us</p>
                                    <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </div>
                                <div className='btn-content2 text-xs md:text-[1.01rem]'>
                                    <div className="option2">Our Aim</div>
                                    <div className="option2">Introduction</div>
                                    <div className="option2">Mission</div>
                                    <div className="option2">Vision</div>
                                    <div className="option2">Chairmans Desk</div>
                                    <div className="option2">Principals Desk</div>
                                    <div className="option2">Our Faculties</div>
                                    <div className="option2">Contact Us</div>
                                </div>

                            </li>
                            <li style={{padding:'2px'}} className='cursor-pointer relative  '>
                                <div className='flex items-center justify-center '>
                                    <p className='text-[0.9rem]  md:text-[1.01rem]'>Notices</p>
                                    <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </div>
                                <div className='btn-content2 text-xs md:text-[1.01rem]'>
                                    <div className="option2">View Notices</div>

                                </div>

                            </li>
                            <li style={{padding:'2px'}} className=' cursor-pointer relative  '>
                                <div className='flex items-center justify-center '>
                                    <p className='text-[0.9rem]  md:text-[1.01rem]'>Alumni</p>
                                    <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </div>
                                <div className='btn-content2 text-xs md:text-[1.01rem]'>
                                    <div className="option2">Alumni Home</div>
                                </div>

                            </li>



                            <div className="img-container w-[50px] md:w-[65px]">
                                <img src="https://aisc.vriddhionline.com/_0DataCenter/AZAMCAMPUS.AISC/AZAMCAMPUS.AISC_Logo.jpg" alt="" />
                            </div>

                         
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffLoginHeader;