import React from 'react';
import StaffLoginHeader from '../components/StaffLoginHeader';
import '../CssComponents/Login_1StudRegisterInfo.css';
import LoginFooter from '../components/Login-footer';
import { Link } from 'react-router-dom';
const Login_1StudRegistrationInfo = () => {
    return (
        <div>
            <StaffLoginHeader />
            <div className='info-body'>
                <h1 className='text-2xl text-blue-500'>
                    Information For Students
                </h1>
                <div className='infoForStudents  w-full'>
                    <h1 className='underline text-center text-2xl text-red-500 uppercase font-medium'>
                        IMPORTANT INSTRUCTION FOR STUDENTS WHILE APPLYING FOR ADMISSION AND PAYING FEE ONLINE
                    </h1>
                    <ul>
                        <li className='text-blue-500'>
                            Do not use your mobile phone to fill the online admission form. It is advised to use a desktop or laptop to visit the vriddhionline.com website.
                        </li>
                        <li>
                            On the website, click on Login -{`>`} Student Login. Students filling the form for the first time must go to the Login -{`>`} Student Register menu and complete the online registration process first.
                        </li>
                        <li>
                            Use a valid email id and a valid mobile number for registration and form submission. (If you do not have a personal mobile and use a shared family phone, keep this mobile with you at the time of form submission).
                        </li>
                        <li>
                            During registration, an OTP will be sent to the mobile number and email. Your email id will also be verified via a link sent to your email. Click on this link.
                        </li>
                        <li>
                            The verification OTP is valid for 5 minutes only and will expire automatically if not used. If you do not receive the OTP on the registered mobile number due to range or other issues, please check your email id. Enter the OTP on the website in the field provided before it expires to verify the mobile number.
                        </li>
                        <li>
                            The Student’s Vriddhi account will be activated after verification. You will receive a confirmation regarding the same on your email and registered mobile number as an SMS.
                        </li>
                        <li>
                            You will receive the 10-digit User ID / Registration ID and Password on your registered mobile number. Students must save their User ID and Password to access their Vriddhi account
                        </li>
                        <li>
                            If a student forgets their Login ID or Password, then they must go to the Login - {`>`} Forget ID or Login -{`>`}Forgot Password to recover the login credentials.
                        </li>
                        <li>
                            If you have already registered previously, by way of taking admission through Vriddhi Portal at any college listed on the site, do not register again.
                        </li>
                        <li>
                            Special symbols such as (#, !, $, &, .,) are not allowed in the Password.
                        </li>
                        <li>
                            After successful registration, the student can apply for new admission.
                        </li>
                        <li>
                            One student should submit only one admission form for a selected class/faculty. Multiple forms submitted by the student for the same class using the same faculty will result in the rejection of the admission forms.
                        </li>
                        <li>
                            Keep scanned copies of your documents, signature, and photograph ready before applying. The scanned file should be less than 500 KB in size. Each document must be uploaded as a separate file. The files should be in the following formats: *.JPEG or *.JPG.
                        </li>
                        <li>
                            After submitting your admission form and uploading scanned copies of your documents, your admission form will be further processed by the admission committee using the “ONLINE APPROVAL” system.
                        </li>
                        <li>
                            Students will get a notification on their email ID or via SMS if their admission form gets rejected. Students should take note of the reason for the rejection of the admission form and rectify it accordingly.
                        </li>
                        <li>
                            If the form is approved/accepted by the admission committee, the student will get an SMS and notification on his email id within 3 days after submitting their admission form. If a student does not get any notification via email or SMS, they must assume that the form is wait-listed. Wait-listed students will be contacted after one month for admission, provided a vacancy exists.
                        </li>
                        <li>
                            Only after approval of the admission form by the admission committee, a student will be able to make fee payments using the online payment gateway.
                        </li>
                        <li>
                            The student must pay the fee amount specified in the SMS or the email on or before the last date mentioned.
                        </li>
                        <li>
                            To pay the fee amount, the student must log in to their account and select the pay fee menu/button.
                        </li>
                        <li>
                            After successful fee payment, the student will get an E-challan on his Vriddhi Dashboard. Select the correct option while paying your fees like a credit card, debit card, net banking, or UPI
                        </li>
                        <p className='text-red-600 text-xl font-medium underline'>NOTICE</p>
                        <ul className='ul2'>
                            <li>
                                These instructions are subject to change without prior notice to the students hence every student must refer the new update (if any) release from time to time.
                            </li>
                            <li>Your active mobile number and valid email id will be used by the college authorities to send online video lectures and online attendance instructions.</li>
                            <li>
                                Using an invalid mobile number and email address may lead to you being marked absent for an online college activity. Students will be solely responsible for such misleading information
                            </li>
                            <li>
                                If you have changed your previously registered mobile number, you can update it from your profile after login, please inform change of your mobile no. to your college to get communications from college.
                            </li>
                        </ul>

                    </ul>
                    
                    <Link to='/login_2StudRegistrationInfo' className='Link'>
                    <button>Click to Continue Registration</button>
                    </Link>
                </div>
            </div>
            <LoginFooter />
        </div>
    );
};

export default Login_1StudRegistrationInfo;