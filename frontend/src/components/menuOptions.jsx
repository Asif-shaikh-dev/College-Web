import React, { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom';
import { useRef , useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


import '../CssComponents/MenuOptions.css'


gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

const MenuOptions = () => {

  



  return (
    <div className=''>
        <div className='flex flex-col justify-center items-center bg-black college-title'>
          <h2 id='gsap-heading' className='text-2xl font-sans bg-gradient-to-r from-[#818CF8] to-purple-400 text-transparent bg-clip-text'> MCE SOCIETY'S</h2>
          <h1 id='gsap-heading' className='college-heading mix-blend-normal text-4xl font-semibold bg-gradient-to-br from-[#818CF8] to-purple-400 z-[1] text-transparent bg-clip-text'>ABEDA INAMDAR SENIOR COLLEGE OF ARTS , SCIENCE AND COMMERCE</h1>
        </div>
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
  );
};

export default MenuOptions;