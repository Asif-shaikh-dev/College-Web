import React from 'react';
import { Link } from 'react-router-dom';

const TopHeader = () => {
  return (

    <nav className='flex h-10 justify-around items-center w-full text-white bg-black '>
      <div className='left-nav  font-sans ' >
        <h4 className='text-gray-200 text-sm'>Addmissions Open</h4>
      </div>
      <div className=' overflow-hidden whitespace-nowrap '>
        <h4 className='scrollable-text' >Addmissions are open for all undergraduate programs for academic year 2024-25</h4>
      </div>
      <div className='right-nav w-[35%] flex items-center justify-between'>
        <div className='cursor-pointer rounded-xl right-nav-op  font-sans '>
          LOGIN
          <div className='Login-options  '>
            <div className="Login-option"><Link to='/staff-login'>Staff Vridhhi Login</Link></div>
            <div className="Login-option"> <Link to='/college-login'> College Login </Link>
             
              </div>
          </div>
        </div>
        <div className='cursor-pointer rounded-xl right-nav-op font-sans'>FEEDBACK</div>
        <div className='cursor-pointer rounded-xl right-nav-op font-sans'>ALUMNI</div>
        <div className='cursor-pointer rounded-xl right-nav-op font-sans'>GALLERY</div>
        <div className='cursor-pointer rounded-xl right-nav-op font-sans'>CONTACT</div>
      </div>

    </nav>

  );
};

export default TopHeader;