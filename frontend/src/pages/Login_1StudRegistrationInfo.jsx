import React from 'react';
import StaffLoginHeader from '../components/StaffLoginHeader';
import '../CssComponents/Login_1StudRegisterInfo.css';
import LoginFooter from '../components/Login-footer';
import { Link } from 'react-router-dom';
const Login_1StudRegistrationInfo = () => {
    return (
        <div className='bg-black'>
            <StaffLoginHeader />
            <div
                className="info-body"
                style={{ padding: '24px', margin: '0 auto', maxWidth: '1200px' }}
            >
                <h1
                    className="text-2xl text-blue-500"
                    style={{ marginBottom: '20px', textAlign: 'center' }}
                >
                    Information For Students
                </h1>

                <div
                    className="infoForStudents w-full"
                    style={{ padding: '20px', marginBottom: '20px' }}
                >
                    <h1
                        className="underline text-center text-xl md:text-2xl text-red-500 uppercase font-medium"
                        style={{ marginBottom: '20px' }}
                    >
                        IMPORTANT INSTRUCTION FOR STUDENTS WHILE APPLYING FOR ADMISSION AND PAYING FEE ONLINE
                    </h1>

                    <ul style={{ paddingLeft: '20px', marginBottom: '30px' }}>
                        <li className="text-blue-500" style={{ marginBottom: '12px' }}>
                        Do not use your mobile phone to fill the online admission form. It is advised to use a desktop or laptop to visit the vriddhionline.com website.
                        </li>
                        <li style={{ marginBottom: '12px' }}>
                        On the website, click on Login -{`>`} Student Login. Students filling the form for the first time must go to the Login -{`>`} Student Register menu and complete the online registration process first.
                        </li>
                        <li style={{ marginBottom: '12px' }}>
                            Use a valid email id and a valid mobile number...
                        </li>
                        <li style={{ marginBottom: '12px' }}>
                            During registration, an OTP will be sent...
                        </li>
                        {/* Keep adding marginBottom as needed for each li */}
                        <li style={{ marginBottom: '12px' }}>
                            After successful fee payment, the student will get an E-challan...
                        </li>
                    </ul>

                    <p
                        className="text-red-600 text-xl font-medium underline"
                        style={{ marginBottom: '16px' }}
                    >
                        NOTICE
                    </p>

                    <ul className="ul2" style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>
                            These instructions are subject to change...
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            Your active mobile number and valid email...
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            Using an invalid mobile number...
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            If you have changed your previously registered mobile...
                        </li>
                    </ul>

                    <Link
                        to="/login_2StudRegistrationInfo"
                        className="Link"
                        style={{ display: 'block', textAlign: 'center', marginTop: '30px' }}
                    >
                        <button
                            style={{
                                padding: '10px 24px',
                                backgroundColor: '#3B82F6',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Click to Continue Registration
                        </button>
                    </Link>
                </div>
            </div>

            <LoginFooter />
        </div>
    );
};

export default Login_1StudRegistrationInfo;