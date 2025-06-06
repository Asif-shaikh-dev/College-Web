import React, { useLayoutEffect } from 'react'

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);




import '../CssComponents/PresidentIntro.css'

const PresidentIntro = () => {
    useLayoutEffect(() => {

        const ctx = gsap.context(() => {
            gsap.from(".info", {
                // Adjusted for a smoother effect
                opacity: 0,
                y:20,
                stagger:0.3,
                duration: 0.5,
                scrollTrigger:{
                    trigger:".college-info",
                    scroller:"body",
                  
                    start:"top 85%",
                    end:"top 60%",
                   
                }
            },);

            

        });
        return () => ctx.revert(); // Cleanup on unmount
    }, []);



    return (
        <div className='main  w-full body'>
            <div className=' '>
                <div className='parent md:h-[100vh] flex flex-col  md:w-full  md:flex-row justify-around items-center'>
                    <div className=' info w-70 college-info h-120  md:h-auto md:w-70 md:bg-black'>
                        <div className='img-container'>
                            <img className='  md:h-[60%] w-full' src="https://www.abedainamdarcollege.org.in/assets/images/services/bg-1.jpg" alt="" />
                        </div>
                        <div className='names flex flex-col'>
                            <h2 className='text-red-500 tracking-wide font-bold president'>DR. P. A. INAMDAR</h2>
                            <h2 className='text-gray-500 font-normal work'>President (M.C.E. Society)</h2>
                            <button className='text-white self-start cursor-pointer text-sm rounded text-center bg-blue-900 hover:bg-[#bbb] duration-550 hover:text-black'>Read More</button>
                        </div>
                    </div>
                    <div className='info w-70  h-120  md:h-auto md:w-70 md:bg-black'>
                        <div className='img-container'>
                            <img className='h-[60%] w-full' src="https://www.abedainamdarcollege.org.in/assets/images/services/bg-2.jpg" alt="" />
                        </div>
                        <div className='names flex flex-col'>
                            <h2 className='text-red-500 tracking-wide font-bold president'>MS. ABEDA INAMDAR</h2>
                            <h2 className='text-gray-500 font-normal work'>Founder (AISC)</h2>
                            <button className='text-white self-start cursor-pointer text-sm rounded text-center bg-blue-900 hover:bg-[#bbb] duration-550 hover:text-black '>Read More</button>
                        </div>
                    </div>
                    <div className=' info w-70  h-120 md:h-auto md:w-70 md:bg-black'>
                        <div className='img-container'>
                            <img className='h-[60%] w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHKMv4S9Hahpwg6lixjbqbAeH0uw0uSZ1BCDvOEwucXCrbFrr8ERl1sVm4_3MG03YoRkw&usqp=CAU" alt="" />
                        </div>
                        <div className='names flex flex-col'>
                            <h2 className='text-red-500 tracking-wide font-bold president'>DR.SHAILA BOOTWALA</h2>
                            <h2 className='text-gray-500 font-normal work'>Principal (AISC)</h2>
                            <button className='text-white self-start cursor-pointer text-sm rounded text-center bg-blue-900 hover:bg-[#bbb] duration-550 hover:text-black'>Read More</button>
                        </div>
                    </div>

                    <div  className='  w-70  h-120  md:h-auto md:w-70 info md:bg-transparent '>
                        <h1 className='font-medium text-xl text-gray-400'>Welcome To<span className='text-red-500'> Abeda Inamdar Senior College</span></h1>
                        <p className='text-gray-400'>The Abeda Inamdar Senior College is one of the institutions established and governed by The Maharashtra Cosmopolitan Education Society. (M.C.E.Society.).<br /> <br />

                            M.C.E.Society, was established in the year 1948 by Late Mr. Abdul Kadir Khan and likeminded educationists, with an objective of providing education to the economically, educationally and socially weaker sections of the society.</p>

                        <button className='text-white self-start cursor-pointer text-sm rounded text-center bg-blue-900 hover:bg-[#bbb] duration-550 hover:text-black'>View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresidentIntro;