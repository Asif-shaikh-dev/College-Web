import React, { useLayoutEffect } from 'react'

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';






import '../CssComponents/collegeDetails.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';


import { useRef, useEffect } from 'react';


import { Autoplay, EffectFade } from 'swiper/modules';

import { Pagination, Navigation } from 'swiper/modules'; // Import required modules
// Import Swiper styles
import 'swiper/css';


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
        <div className='text-white flex justify-start gap-5  items-center h-[100vh] w-full '>
            <div className='left-list w-[30%]'>
                <ul>
                    <li>IMPoratnt links</li>
                    <li>alumni</li>
                    <li>infrastructure</li>
                    <li>library</li>
                    <li>policies</li>
                    <li>placement</li>
                    <li>nss</li>
                    <li>ncc</li>
                    <li>sports</li>
                    <li>i & e start-up cell</li>
                    <li>Complaint from student</li>
                </ul>
            </div>
            <div className='img-con w-[70%] h-[85%]  bg-red-400'>
                <div className='slider-container h-[100%] w-[100%] bg-amber-950'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        effect="fade"  // Enables fade animation
                        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide every 3 sec
                        loop={true} // Infinite loop
                        modules={[Autoplay, EffectFade]}
                        className="swiper-wrapper"
                    >

                        <div className='swiper-wrapper h-[100%] w-[100%]  '>

                            <SwiperSlide>
                                <div className='slider-content h-[150%] w-[100%] bg-red-900 '>
                                    <img className='w-[100%] object-cover' src="https://www.abedainamdarcollege.org.in/assets/images/chem.jpg" alt="phoo" />
                                </div>
                            </SwiperSlide>


                            <SwiperSlide>

                                <div className='slider-content h-full overflow-hidden w-full bg-amber-700'>
                                    <img className='h-[100%] w-[100%] block  object-cover' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNSE4rznvKdQjGl7_NAnRaJo4hcL2yBH01zPGjnhu3VSLzOjY4uL2NgmlZm8U_zta4JPLZyA0iFuAcgidEyVyV5Vz9b_E8FPYKRp0HHUCJrHnJ_2VUcfdPG_Gz0oA12Z51QlTQWVymLMZq/s1600/2.+PG+building.jpg" alt="phoo" />
                                </div>
                            </SwiperSlide>


                            <SwiperSlide>

                                <div className='slider-content h-[100%] w-[100%] bg-amber-700'>
                                    <img className='h-[100%] w-[100%] object-cover' src="https://media.getmyuni.com/azure/college-images-test/abeda-inamdar-senior-college-for-girls-pune/d31924bff7f740feae537d8ee9c1f76d.jpeg
                                        " alt="phoo" />
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>

                                <div className='slider-content h-[100%] w-[100%] bg-amber-700'>
                                    <img className='h-[100%] w-[100%] object-cover' src="https://www.admissionwala.in/storage/productimages/1.jpg" alt="phoo" />
                                </div>
                            </SwiperSlide>


                        </div>
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