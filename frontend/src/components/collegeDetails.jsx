import React, { useLayoutEffect } from 'react'

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../CssComponents/collegeDetails.css'

// Import Swiper React components













const CollegeDetails = () => {

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
          
                            gsap.from(".left-list", {
                                // Adjusted for a smoother effect
                                opacity: 0,
                                scale: 0.9,
                                delay: 1,
                                duration: 1
                            },);
                
                            gsap.from(".img-con", {
                                // Adjusted for a smoother effect
                                opacity: 0,
                                scale: 0.9,
                                delay: 1,
                                duration: 1
                            },);
    
        

        });






        return () => ctx.revert(); // Cleanup on unmount
    }, []);



    return (
        <div className=" text-white flex flex-col md:flex-row items-start md:items-center h-auto md:h-screen w-full  p-4 gap-4 bg-black">
        {/* Left Links */}
        <div className="left-list w-full  md:w-[30%] ">
          <ul className="space-y-2 text-sm md:text-base">
            <li>Important Links</li>
            <li>Alumni</li>
            <li>Infrastructure</li>
            <li>Library</li>
            <li>Policies</li>
            <li>Placement</li>
            <li>NSS</li>
            <li>NCC</li>
            <li>Sports</li>
            <li>I & E Start-up Cell</li>
            <li>Complaint from Student</li>
          </ul>
        </div>
  
        {/* Right Image Carousel */}
        <div className="img-con  md:w-[70%]  h-[300px] md:h-[85%]  rounded-md overflow-hidden ">
          <div className="slider-container h-full  w-full bg-amber-700">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              modules={[Autoplay, EffectFade]}
              className="h-full"
            >
              <SwiperSlide>
                <div className="slider-content h-full w-full bg-red-700">
                  <img
                    className="w-full h-full object-cover"
                    src="https://www.abedainamdarcollege.org.in/assets/images/chem.jpg"
                    alt="chem"
                  />
                </div>
              </SwiperSlide>
  
              <SwiperSlide>
                <div className="slider-content h-full w-full bg-amber-700">
                  <img
                    className="w-full h-full object-cover"
                    src="https://www.abedainamdarcollege.org.in/assets/images/slide-1.jpg"
                    alt="pg-building"
                  />
                </div>
              </SwiperSlide>
  
              <SwiperSlide>
                <div className="slider-content h-full  w-full bg-amber-700">
                  <img
                    className="w-full h-full object-cover"
                    src="https://media.getmyuni.com/azure/college-images-test/abeda-inamdar-senior-college-for-girls-pune/d31924bff7f740feae537d8ee9c1f76d.jpeg"
                    alt="college"
                  />
                </div>
              </SwiperSlide>
  
              <SwiperSlide>
                <div className="slider-content h-full w-full bg-amber-700">
                  <img
                    className="w-full h-full object-cover"
                    src="https://www.admissionwala.in/storage/productimages/1.jpg"
                    alt="campus"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    );
};

export default CollegeDetails;

//https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNSE4rznvKdQjGl7_NAnRaJo4hcL2yBH01zPGjnhu3VSLzOjY4uL2NgmlZm8U_zta4JPLZyA0iFuAcgidEyVyV5Vz9b_E8FPYKRp0HHUCJrHnJ_2VUcfdPG_Gz0oA12Z51QlTQWVymLMZq/s1600/2.+PG+building.jpg



//https://media.getmyuni.com/azure/college-images-test/abeda-inamdar-senior-college-for-girls-pune/d31924bff7f740feae537d8ee9c1f76d.jpeg


//https://img.youtube.com/vi/je8KL8XuSTs/0.jpg