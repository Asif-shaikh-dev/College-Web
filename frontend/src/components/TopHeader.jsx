import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

const TopHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <nav className='flex h-15  sticky top-0  justify-around items-center w-full text-white bg-black '>
        <div style={{ padding: '8px' }} className=' flex flex-col   justify-between md:gap-2 md:flex-row md:text-center'>
          <div className='left-nav text-center font-sans ' >
            <h4 className='text-gray-200 text-sm'>Addmissions Open</h4>
          </div>

          <div className='flex w-full gap-1.5'>
            <div className='overflow-hidden w-[70%] md:w-[95%]   whitespace-nowrap '>
              <h4 className='scrollable-text' >Addmissions are open for all undergraduate programs for academic year 2024-25</h4>
            </div>

            <div className="md:hidden  "  >
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: '20px', color: 'white' }} className='text-white'>
                ☰
              </button>
            </div>

          </div>

        </div>


        <div className='hidden md:flex right-nav w-[35%] items-center justify-between'>
          <div className='cursor-pointer rounded-xl right-nav-op font-sans '>
            LOGIN
            <div className='Login-options'>
              <div className=" Login-option"><Link to='/staff-login'>Staff Vridhhi Login</Link></div>
              <div className=" Login-option"> <Link to='/college-login'> College Login </Link></div>
            </div>
          </div>
          <div className=' cursor-pointer rounded-xl right-nav-op font-sans'>FEEDBACK</div>
          <div className=' cursor-pointer rounded-xl right-nav-op font-sans'>ALUMNI</div>
          <div className=' cursor-pointer rounded-xl right-nav-op font-sans'>GALLERY</div>
          <div className=' cursor-pointer rounded-xl right-nav-op font-sans'>CONTACT</div>



        </div>


      </nav>
      {menuOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 12px', border: "2px" }} className="md:hidden text-sm  bg-gray-800 text-white">
          <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <Link to="/staff-login">Staff Vridhhi Login</Link>
          </div>
          <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>
            <Link to="/college-login">College Login</Link>
          </div>
          <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>FEEDBACK</div>
          <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>ALUMNI</div>
          <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>GALLERY</div>
          <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>CONTACT</div>
        </div>
      )}
    </div>

  );
};

export default TopHeader;