import React from 'react';
import '../CssComponents/Login-footer.css';

const LoginFooter = () => {
    return (
        <footer>
            <div style={{padding:'20px'}} className="bg-[#0b2747] text-white py-10 px-5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <img
                            src="https://aisc.vriddhionline.com/_0DataCenter/AZAMCAMPUS.AISC/AZAMCAMPUS.AISC_Logo.jpg"
                            alt="College Logo"
                            className="w-36 sm:w-44 md:w-48"
                        />
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h2 className="text-lg sm:text-xl font-medium mb-2">Contact Us</h2>
                        <h3 className="text-base sm:text-lg font-light text-red-400">
                            Abeda Inamdar Senior College Of Arts, Science & Commerce
                        </h3>
                        <p className="text-sm text-gray-300">
                            Affiliated To Savitribai Phule Pune University
                        </p>
                        <div className="mt-2 space-y-1 text-sm font-thin">
                            <p>
                                <span className="text-red-400 underline">Telephone:</span> N.A.
                            </p>
                            <p>
                                <span className="font-thin">Fax:</span> N.A.
                            </p>
                            <p>
                                <span className="text-red-400 underline">Email:</span>{" "}
                                abedainamdarseniorcollege@azamcampus.org
                            </p>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold mb-2">Our Features</h2>
                        <ul className="text-sm space-y-2 text-gray-300 list-disc list-inside">
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
                    <div >
                        <h2 className="text-lg sm:text-xl font-bold mb-2">About Vriddhi</h2>
                        <p className="text-sm text-gray-300 leading-relaxed mb-2">
                            Implementing college management software is not an adequate move for
                            efficient and optimal use of resources. All staff of educational
                            institutions require sound knowledge of college ERP software.
                        </p>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Our{" "}
                            <span className="text-red-400 font-bold">best college management software</span>{" "}
                            enables business processes with clarity, transparency, and
                            accountability. For detail information about product, service and
                            support you can visit Vriddhisoftware.
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 border-t border-gray-600 pt-6">
                    <div className="text-center space-y-3 mb-5 px-2">
                        <h2 className="text-red-500 underline font-bold text-xl sm:text-2xl">
                            Vriddhi Software Solutions Private Limited
                        </h2>
                        <p className="text-sm text-gray-300">
                            Corporate Office: 8A, Damji Samji Trade Center, Opp. Best Depot,
                            Station Road, Vidya Vihaar (W), Mumbai 86
                        </p>
                        <p className="text-sm text-gray-300">
                            Reg Office: 312/2C, Sandesh Cinemax Road, Beside Rajasthan Royal,
                            Malegaon, Nashik, 423203
                        </p>
                    </div>

                    <div className="bg-blue-950 flex text-center flex-col justify-between items-center gap-3 px-5 py-3 space-y-2 sm:space-y-0 text-sm">
                        <p>© Vriddhi Software Private Limited, All rights reserved</p>
                        <div className="flex gap-4  justify-center">
                            <span className="font-bold cursor-pointer hover:underline">
                               The First Ever Project By Asif <br/>
                               <span className='text-red-400'>(12/4/2025)
                                </span>
                            </span>
                          
                        </div>
                    </div>
                </div>
            </div>




        </footer>
    );
};

export default LoginFooter;