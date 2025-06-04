import React from 'react';
import '../CssComponents/Login-footer.css';

const LoginFooter = () => {
    return (
        <footer>
            <div className="bg-[#0b2747] text-white footer-1 py-10 px-5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
                    {/* Contact Section */}
                    <div className='img-container  flex items-center justify-center'>
                        <img
                            src="https://aisc.vriddhionline.com/_0DataCenter/AZAMCAMPUS.AISC/AZAMCAMPUS.AISC_Logo.jpg"
                            alt="College Logo"
                            className="w-48 "
                        />
                    </div>
                    <div className=' contact-container '>
                        <h2 className="text-xl font-medium ">
                            Contact Us
                        </h2>
                        <h3 className="text-xl font-light text-red-400">
                            Abeda Inamdar Senior College Of Arts, Science & Commerce
                        </h3>
                        <p className="text-sm text-gray-300">Affiliated To Savitribai Phule Pune University</p>
                        <p className='font-thin text-sm'>
                            <span className=" text-red-400 border-b-1 border-dotted border-red-400 ">Telephone:</span>
                        </p>
                        <p className='font-thin text-sm'>
                            <span className="font-thin">Fax:</span> N.A.
                        </p>
                        <p className='font-thin text-sm'>
                            <span className=" text-red-400 border-b-1 border-dotted border-red-400 ">Email:</span> abedainamdarseniorcollege@azamcampus.org
                        </p>
                    </div>

                    {/* Features Section */}
                    <div className='contact-container'>
                        <h2 className="text-xl font-bold">Our Features</h2>
                        <ul className="text-sm space-y-2 text-gray-300 list-disc">
                            <li>Online Admission/Merit Form</li>
                            <li>Online CET Form</li>
                            <li>Online Fee Payment</li>
                            <li>Fee Chalan Printing</li>
                            <li>Document Upload</li>
                            <li>Online OPAC</li>
                            <li>LMS</li>
                            <li>NAAC Compatible Reports</li>
                        </ul>
                    </div>

                    {/* About Section */}
                    <div className='contact-container'>
                        <h2 className="text-xl font-bold">About Vriddhi</h2>
                        <p className="text-sm text-gray-300">
                            Implementing college management software is not an adequate move for
                            efficient and optimal use of resources. All staff of educational
                            institutions require sound knowledge of college ERP software.
                        </p>
                        <p className="text-sm text-gray-300">
                            Our <span className="text-red-400 font-bold text-sm">best college management software</span> enables
                            business processes with clarity, transparency, and accountability.For detail information about product, service and support you can visit Vriddhisoftware.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className=" text-center text-sm border-t border-gray-600 pt-5">
                    <div className='contact-container'>
                        <h2 className="text-red-600 underline font-bold text-2xl">Vriddhi Software Solutions Private Limited</h2>
                        <p className='text-gray-300'>Corporate Office: 8A, Damji Samji Tade Center, Opp. Best Depot, Station Road, Vidya Vihaar (W), Mumbai 86</p>
                        <p className='text-gray-300'>Reg Office/Correspondence: 312/2C, Sandesh Cinemax Road, Beside Rajasthan Royal, Malegaon, Nashik, 423203</p>
                    </div>
                    <div className="bg-blue-950 flex justify-around space-x-5 items-center h-15 text-white">

                        <p className="mt-3">© Vriddhi Software Private Limited, All rights reserved</p>
                        <span className='font-bold'>Developer Community</span>
                        <span className='font-bold'>Terms and Conditions</span>


                    </div>
                </div>
            </div>



        </footer>
    );
};

export default LoginFooter;