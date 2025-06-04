import React, { useLayoutEffect } from 'react'

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


import TableSwitcher from '../pages/table';
gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

const AdmissionEnquiry = () => {
   const submitHandeler = (e)=>{
      e.preventDefault();
    }


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(".table-div", {
        // Adjusted for a smoother effect
        x:-100,
        opacity: 0,
        duration: 1,
        scrollTrigger:{
          trigger:".Addmission-Enquiry .table-div",
          scroller:"body",
          start:'top 80%',
          end:"top 50%",
          
          scrub:1
        }
  
      },);
      gsap.from(".enquiry-form", {
        // Adjusted for a smoother effect
        x:100,
        opacity: 0,
        duration: 1,
        scrollTrigger:{
          trigger:".Addmission-Enquiry .table-div",
          scroller:"body",
          start:'top 80%',
          end:"top 50%",
         
          scrub:1
        }
  
      },);



    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);



  return (
    <div className='Addmission-Enquiry flex items-center justify-around h-[100vh] w-full'>
      <div className='table-div h-[80%] w-[500px]  '>
        <h1 className='font-medium text-base text-white '>FOR ADMISSION ENQUIRY CONTACT(10:00 AM TO 05.00 PM)</h1>
        <div className='whole-table'>
          <TableSwitcher />
        </div>
      </div>

      <div className='enquiry-form h-[80%] w-[50%] '>
        <h1 className='font-medium text-lg text-white text-center'>Enquiry Form</h1>
        <form action="" onSubmit={(e)=>submitHandeler(e)} className='h-[100%] w-[100%] flex flex-col justify-evenly '>
          <input className='name w-[100%] h-12 bg-transparent border-1 text-sm text-white' type="text" placeholder='Enter Your Name' />
          <input className='name w-[100%] h-12 bg-transparent border-1 text-sm text-white' type="email" placeholder='Enter Your Email' />
          <input className='name w-[100%] h-12 bg-transparent border-1 text-sm text-white' type="number" placeholder='Enter your Mobile No.' />
          <select className='name w-[100%] h-12 focus:bg-black border-1 text-sm bg-black text-white' name="" id="">
            <option value="" defaultValue className='bg-black text-white'>Select Subject</option>
            <option value="" className='bg-black text-white'>Hindi</option>
            <option value="" className='bg-black text-white'>English</option>
            <option value="" className='bg-black text-white'>Marathi</option>
            <option value="" className='bg-black text-white'>Bangoli</option>
          </select>
          <textarea name="" id="" placeholder='Enter Isuues/Query' className='name w-[100%] h-25 bg-transparent text-white border-1 text-sm '></textarea>
          <button type='submit'  className='text-[1rem] cursor-pointer h-8 w-15 text-white font-medium bg-green-500 self-center rounded'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionEnquiry;