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
    <div style={{padding:'20px'}} className="Addmission-Enquiry flex flex-col lg:flex-row items-center justify-around h-auto min-h-screen w-full bg-[#000] px-5 py-10 space-y-10 lg:space-y-0">
  
    {/* Contact Info Section */}
    <div className="table-div w-full flex flex-col  lg:w-[500px] h-auto">
      <h1 className="font-medium text-sm w-full  md:text-base text-white text-center mb-4">
        FOR ADMISSION ENQUIRY CONTACT<br/> (10:00 AM TO 05.00 PM)
      </h1>
      <div className="whole-table">
        <TableSwitcher />
      </div>
    </div>
  
    {/* Enquiry Form Section */}
    <div className="enquiry-form w-full lg:w-[50%] h-auto">
      <h1 className="font-medium text-lg text-white text-center mb-6">Enquiry Form</h1>
      
      <form
        onSubmit={(e) => submitHandeler(e)}
        className="w-full flex flex-col space-y-4"
      >
        <input
          className="h-12 px-3 bg-transparent border border-white rounded text-sm text-white placeholder-white focus:outline-none"
          type="text"
          placeholder="Enter Your Name"
        />
        <input
          className="h-12 px-3 bg-transparent border border-white rounded text-sm text-white placeholder-white focus:outline-none"
          type="email"
          placeholder="Enter Your Email"
        />
        <input
          className="h-12 px-3 bg-transparent border border-white rounded text-sm text-white placeholder-white focus:outline-none"
          type="number"
          placeholder="Enter your Mobile No."
        />
        <select
          className="h-12 px-3 border border-white bg-black text-white text-sm rounded focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>Select Subject</option>
          <option>Hindi</option>
          <option>English</option>
          <option>Marathi</option>
          <option>Bangoli</option>
        </select>
        <textarea
          placeholder="Enter Issues/Query"
          className="h-24 px-3 py-2 bg-transparent border border-white rounded text-sm text-white placeholder-white focus:outline-none resize-none"
        ></textarea>
        <button
        style={{paddingRight:'10px',paddingLeft:'10px',marginTop:'10px'}} 
          type="submit"
          className="h-10 px-6 text-white font-medium bg-green-500 hover:bg-green-600 rounded self-center"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default AdmissionEnquiry;