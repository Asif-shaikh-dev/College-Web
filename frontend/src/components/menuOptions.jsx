import React, { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


import '../CssComponents/MenuOptions.css'


gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

const MenuOptions = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };




  return (
    <div className=''>
      <div className="flex flex-col justify-center items-center bg-black p-4 sm:p-6 md:p-10 text-center college-title">
        <h2
          id="gsap-heading"
          className="text-lg sm:text-xl md:text-2xl font-sans bg-gradient-to-r from-[#818CF8] to-purple-400 text-transparent bg-clip-text"
        >
          MCE SOCIETY'S
        </h2>

        <h1
          id="gsap-heading"
          className="college-heading mix-blend-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-br from-[#818CF8] to-purple-400 z-[1] text-transparent bg-clip-text mt-2 sm:mt-4"
        >
          ABEDA INAMDAR SENIOR COLLEGE OF ARTS, SCIENCE AND COMMERCE
        </h1>
      </div>

      <div className="sticky top-0 z-20 bg-black text-white">
        <div className="w-full h-20 px-4 flex justify-between items-center md:justify-around font-mono">
          {/* <div className="text-lg font-bold">LOGO</div> */}

          {/* Hamburger for mobile */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 8px', paddingLeft: '20px' }}className="md:hidden  w-full">
            <button className='md:hidden toggle-mobile-menu' onClick={toggleMobileMenu}>
              <svg className="w-7 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Main menu (hidden on small screens) */}
          <div className="hidden md:flex gap-6 items-center text-gray-400">
            <div className='sticky top-0 z-20 bg-black'>
              <div className='menu-section cursor-pointer text-gray-400  w-screen h-20  flex justify-around items-center font-mono '>


                <div className='asif'>
                  <div className='dropdown rounded-xl  '>
                    <h4 className='home'>HOME</h4>
                    <div className="btn-content text-sm">
                      <div className="option">Option 1</div>
                      <div className="option">Option 2</div>
                      <div className="option">Option 3</div>
                    </div>
                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>ABOUT US</h4>
                      <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#c6c6c6"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                    </div>
                    <div className='btn-content  text-sm'>
                      <Link to="/about-aisc" >
                        <div className="option">
                          About AISC
                        </div>
                      </Link>
                      <div className="option">About MCE Society</div>
                      <div className="option">Presidents Message</div>
                      <div className="option">Vice Presidents Message</div>
                      <div className="option">Principal Message</div>
                      <div className="option">Our Objective & Mission</div>
                      <div className="option">Our Goals & Values</div>
                      <div className="option">Graduate Attributes</div>
                    </div>

                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>Departments</h4>
                      <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#c6c6c6"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                    </div>
                    <div className='btn-content  text-sm'>
                      <div className="option">Faculty of Arts</div>
                      <div className="option">Faculty of Commerce</div>
                      <div className="option">Faculty of Science</div>
                    </div>
                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>SYLLABUS</h4>
                    </div>
                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>EXAMINATION</h4>
                    </div>
                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>PROSPECTS</h4>
                    </div>
                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>IQAC</h4>
                      <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#c6c6c6"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                    </div>
                    <div className='btn-content  text-sm'>
                      <div className="option">NAAC</div>
                      <div className="option">NIRF</div>
                      <div className="option">NEP-ABC ID</div>
                    </div>
                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>AUTONOMY</h4>
                    </div>
                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>RESEARCH</h4>
                    </div>
                  </div>
                </div>
                <div className='asif'>
                  <div className='dropdown rounded-xl '>
                    <div className='option-heading flex items-center'>
                      <h4 className='about'>STUDENTS CORNER</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden  bg-black bg-opacity-95 flex flex-col justify-center items-center space-y-6 text-[.9rem] text-gray-300 z-50">
            <div className='asif'>
              <div className='dropdown rounded-xl  '>
                <h4 className='home'>HOME</h4>
                <div className="btn-content text-sm">
                  <div className="option">Option 1</div>
                  <div className="option">Option 2</div>
                  <div className="option">Option 3</div>
                </div>
              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>ABOUT US</h4>
                  <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#c6c6c6"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                </div>
                <div className='btn-content  text-sm'>
                  <Link to="/about-aisc" >
                    <div className="option">
                      About AISC
                    </div>
                  </Link>
                  <div className="option">About MCE Society</div>
                  <div className="option">Presidents Message</div>
                  <div className="option">Vice Presidents Message</div>
                  <div className="option">Principal Message</div>
                  <div className="option">Our Objective & Mission</div>
                  <div className="option">Our Goals & Values</div>
                  <div className="option">Graduate Attributes</div>
                </div>

              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>Departments</h4>
                  <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#c6c6c6"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                </div>
                <div className='btn-content  text-sm'>
                  <div className="option">Faculty of Arts</div>
                  <div className="option">Faculty of Commerce</div>
                  <div className="option">Faculty of Science</div>
                </div>
              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>SYLLABUS</h4>
                </div>
              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>EXAMINATION</h4>
                </div>
              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>PROSPECTS</h4>
                </div>
              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>IQAC</h4>
                  <svg className='arrow' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#c6c6c6"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                </div>
                <div className='btn-content  text-sm'>
                  <div className="option">NAAC</div>
                  <div className="option">NIRF</div>
                  <div className="option">NEP-ABC ID</div>
                </div>
              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>AUTONOMY</h4>
                </div>
              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>RESEARCH</h4>
                </div>
              </div>
            </div>
            <div className='asif'>
              <div className='dropdown rounded-xl '>
                <div className='option-heading flex items-center'>
                  <h4 className='about'>STUDENTS CORNER</h4>
                </div>
              </div>
            </div>
          </div>

        )}
      </div>

    </div>
  );
};

export default MenuOptions;