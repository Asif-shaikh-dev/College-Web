import React from 'react';
import MenuOptions from '../components/menuOptions';
import TopHeader from '../components/TopHeader';
import '../CssComponents/AboutAISC.css'
import LoginFooter from '../components/Login-footer';

const AboutAISC = () => {
    return (
        <div>
            <div className='sticky top-0 z-50'>
            <TopHeader  />

            </div>
            <MenuOptions />
            <div className='flex whole-box flex-col justify-around gap-3'>
                <div className='box bg-gray-100 flex gap-3 w-full h-250px] items-center justify-around'>
                    <div className='img-container h-[full] w-[30vw]  '>
                        <img className='h-[100%] object-cover w-[100%]' src="https://i.ytimg.com/vi/je8KL8XuSTs/hqdefault.jpg" alt="" />
                    </div>
                    <div className='about-info flex flex-col w-[70%] gap-3'>
                        <h1 className='font-sans text-xl uppercase '>About Abeda Inamdar Senior College</h1>
                        <p className='text-gray-600 '>The Abeda Inamdar Senior College is one of the institutions established and governed by The Maharashtra Cosmopolitan Education Society (M.C.E. Society). The M.C.E. Society, was established in the year 1948 by Late Mr. Abdul Kadir Khan and likeminded educationists, with an objective of providing education to the economically, educationally and socially weaker sections of the society. The M.C.E. Society is an educational society registered under the Society's Registration Act of 1860 and also a Public Trust registered under the Bombay Public Trust Act 1950. It is also registered under section 12 (a) of Income Tax Act 1961 and is exempted u/s 80G of the said Act by the Income Tax Commissioner, Pune.</p>
                        <button className='bg-blue-900 self-start text-white font-light flex items-center'>Read More</button>
                    </div>
                </div>
          
                <div className='box bg-gray-100 flex gap-3 w-full h-250px] items-center justify-around'>
                    <div className='img-container h-[full] w-[30vw]  '>
                        <img className='h-[100%] object-cover w-[100%]' src="https://i.ytimg.com/vi/je8KL8XuSTs/hqdefault.jpg" alt="" />
                    </div>
                    <div className='about-info flex flex-col w-[70%] gap-3'>
                        <h1 className='font-sans text-xl uppercase '>About M.C.E. Society</h1>
                        <p className='text-gray-600 '>Maharashtra Cosmopolitan Education Society (MCES), was established in the year 1948 by Late Mr.Abdul Kadir Khan and others, with an objective of providing education to the economically, educationally and socially weaker sections of the society. It is an educational society registered under the Societys Registration Act of 1860 and also a Public Trust registered under the Bombay Public Trust Act 1950. It is also registered under section 12(a)of Income Tax Act 1961 and is exempted u/s 80G of the said Act by the Income Tax Commissioner, Pune.</p>
                        <button className='bg-blue-900 self-start text-white font-light flex items-center'>Read More</button>
                    </div>
                </div>
                <div className='box bg-gray-100 flex gap-3 w-full h-250px] items-center justify-around'>
                    <div className='img-container h-[full] w-[30vw]  '>
                        <img className='h-[100%] object-cover w-[100%]' src="https://www.abedainamdarcollege.org.in/assets/images/services/bg-1.jpg" alt="" />
                    </div>
                    <div className='about-info flex flex-col w-[70%] gap-3 justify-around'>
                        <h1 className='font-sans text-xl uppercase '>DR. P. A. INAMDAR President (M.C.E. Society)</h1>
                        <p className='text-gray-600 '>The Global economic scenario is changing rapidly, what was modern yesterday is suddenly obsolete today. Thus the industries need trained personnel who can innovate rather than just follow others.
                        I strongly believe that if the right kind of soft skills, Communication and language skills and computer knowledge are imparted to the students, there is no doubt that they will be able to not only lead the community but also develop a strong nation . At Abeda Inamdar Senior College, Pune, our aim is to produce such talented, young and dynamic professionals.</p>
                        <button className='bg-blue-900 self-start text-white font-light flex items-center'>Introductory Video</button>
                    </div>
                </div>
                <div className='box bg-gray-100 flex gap-3 w-full h-250px] items-center justify-around'>
                    <div className='img-container h-[full] w-[30vw]  '>
                        <img className='h-[100%] object-cover w-[100%]' src="https://www.abedainamdarcollege.org.in/assets/images/services/bg-2.jpg" alt="" />
                    </div>
                    <div className='about-info flex flex-col w-[70%] gap-3 justify-around'>
                        <h1 className='font-sans text-xl uppercase '>MRS. ABEDA INAMDAR,</h1>
                        <h2 className='text-sm font-bold text-black'>Founder Abeda Inamdar Senior College</h2>
                        <p className='text-gray-600 '>She has keen interest in Education, particularly Women’s Education. For this reason she has donated a huge amount for establishing Abeda Inamdar Junior College for Girls and Abeda Inamdar Senior College for Girls at Pune , where at present 10,000 girls are taking education in Arts, Science, Commerce and Computer faculty.Member Committee on Girls Education: National Commission for Minority Educational Institution, New Delhi.Senate Member- Swami Ramanand Teerth Marathwada University, Nanded.Ex Senate Member of University of Pune.Managing Trustee & Past President - Poona Women’s Council.Vice President- University Women’s Association.</p>
                        <button className='bg-blue-900 self-start text-white font-light flex items-center'>Read More</button>
                    </div>
                </div>
                <div className='box bg-gray-100 flex gap-3 w-full h-250px] items-center justify-around'>
                    <div className='img-container h-[full] w-[30vw]  '>
                        <img className='h-[100%] object-cover w-[100%]' src="https://www.abedainamdarcollege.org.in/assets/images/services/bg-3.jpg" alt="" />
                    </div>
                    <div className='about-info flex flex-col w-[70%] gap-3 justify-around'>
                        <h1 className='font-sans text-xl uppercase '>PROF.(DR) SHAILA BOOTWALA,</h1>
                        <h2 className='text-sm font-bold text-black'>Principal (Abeda Inamdar Senior College)</h2>
                        <p className='text-gray-600 '>We at M.C.E. Society's Abeda Inamdar Senior College believe in the philosophy 'to educate is to empower'. The mission statement of the college - 'Read to Lead' is truly emblematic of this philosophy. Empowerment, however, requires more than academic excellence. In today's competitive and demanding world, our students must also excel in sports and extracurricular activities. These will equip them with the necessary soft skills to go that extra mile. The college makes every possible attempt to synergize this into the education process. The highly efficient teaching staff ensures academic excellence. Well equipped library, sports complex and laboratories ensure an environment conducive to learning. Cultural gatherings, sports tournaments, publication of bulletins, exhibitions, and seminars and so on all find their way into the academic calendar of our college. The college also fulfills its social obligations through the activities of its vibrant NSS Unit.</p>
                        <button className='bg-blue-900 self-start text-white font-light flex items-center'>Read More</button>
                    </div>
                </div>

            </div>
            <LoginFooter ></LoginFooter>
        </div>
    );
};

export default AboutAISC;