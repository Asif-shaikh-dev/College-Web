import React, { useLayoutEffect } from 'react'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import '../CssComponents/start.css'
import MenuOptions from '../components/menuOptions'


import CollegeDetails from '../components/collegeDetails'
import PresidentIntro from '../components/PresidentIntro'
import Table from './table';
import AdmissionEnquiry from '../components/AddmissonEnquiry'
import TopHeader from '../components/TopHeader';
import LoginFooter from '../components/Login-footer';
gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

const Start = () => {
  const boxref = useRef()

  useLayoutEffect(() => { //prevents fluttering of website
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
     
        tl.from("#gsap-heading", {
        
          y: 30, // Adjusted for a smoother effect
          opacity: 0,
          duration: 1,
          delay: 0.3,
          stagger: 0.15, // Staggers each item by 0.15s
        },);
     
  
        tl.from(".left-nav", {
          
          y: 30, // Adjusted for a smoother effect
          opacity: 0,
          duration: 0.5,
  
          delay: 0.6,
          stagger: 0.15, // Staggers each item by 0.15s
        }, "+-1");
  
        tl.from(".toggle-mobile-menu", {
        
          y: 20, // Adjusted for a smoother effect
          opacity: 0,
          duration: 0.5,
          delay: 0.1,
           // Staggers each item by 0.15s
        },"+-0.5");
        tl.from(".right-nav", {
          
          y: 30, // Adjusted for a smoother effect
          opacity: 0,
          delay: 0.6,
          duration: 1,
  
          stagger: 0.15, // Staggers each item by 0.15s
        }, "+-1");
  
        tl.from(".scrollable-text", {
          duration: 0.5,
          // Adjusted for a smoother effect
          opacity: 0,
  
  
          stagger: 0.15, // Staggers each item by 0.15s
        }, "+-3");
   
  
        tl.from(".menu-section", {
          duration: 0.3,
          y: 30, // Adjusted for a smoother effect
          opacity: 0,
  
          delay: 1,
          stagger: 0.05, // Staggers each item by 0.15s
        },"-=3.5");

    
        // Prevent animation from playing again in the same session
       
    })

    


   

    return () => ctx.revert(); // Cleanup on unmount
  }, []);



  return (
    <div >
      <TopHeader />
      <div className='college-body w-full flex flex-col   bg-black  '>

        <MenuOptions />
        <CollegeDetails />
        <PresidentIntro />
        <AdmissionEnquiry />
      
      </div>


      <footer>
        <LoginFooter />
      </footer>
    </div>

  )
}

export default Start