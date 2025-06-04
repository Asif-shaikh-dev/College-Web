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
                  
                    start:"top 80%",
                    end:"top 50%",
                   
                }
            },);

            

        });
        return () => ctx.revert(); // Cleanup on unmount
    }, []);



    return (
        <div className='main h-[80vh] w-full body'>
            <div className=' '>
                <div className='parent h-110 w-full flex justify-around items-center'>
                    <div className='h-[90%] info w-70 bg-black'>
                        <div className='img-container'>
                            <img className='h-[60%] w-full' src="data:image/jpeg;base64,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" alt="" />
                        </div>
                        <div className='names flex flex-col'>
                            <h2 className='text-red-500 tracking-wide font-bold president'>DR. P. A. INAMDAR</h2>
                            <h2 className='text-gray-500 font-normal work'>President (M.C.E. Society)</h2>
                            <button className='text-white self-start cursor-pointer text-sm rounded text-center bg-blue-900 hover:bg-[#bbb] duration-550 hover:text-black'>Read More</button>
                        </div>
                    </div>
                    <div className='h-[90%] info w-70 bg-black'>
                        <div className='img-container'>
                            <img className='h-[60%] w-full' src="data:image/jpeg;base64,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" alt="" />
                        </div>
                        <div className='names flex flex-col'>
                            <h2 className='text-red-500 tracking-wide font-bold president'>MS. ABEDA INAMDAR</h2>
                            <h2 className='text-gray-500 font-normal work'>Founder (AISC)</h2>
                            <button className='text-white self-start cursor-pointer text-sm rounded text-center bg-blue-900 hover:bg-[#bbb] duration-550 hover:text-black '>Read More</button>
                        </div>
                    </div>
                    <div className='h-[90%] info w-70 bg-black'>
                        <div className='img-container'>
                            <img className='h-[60%] w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHKMv4S9Hahpwg6lixjbqbAeH0uw0uSZ1BCDvOEwucXCrbFrr8ERl1sVm4_3MG03YoRkw&usqp=CAU" alt="" />
                        </div>
                        <div className='names flex flex-col'>
                            <h2 className='text-red-500 tracking-wide font-bold president'>DR.SHAILA BOOTWALA</h2>
                            <h2 className='text-gray-500 font-normal work'>Principal (AISC)</h2>
                            <button className='text-white self-start cursor-pointer text-sm rounded text-center bg-blue-900 hover:bg-[#bbb] duration-550 hover:text-black'>Read More</button>
                        </div>
                    </div>

                    <div className='h-[90%] w-70 info college-info'>
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