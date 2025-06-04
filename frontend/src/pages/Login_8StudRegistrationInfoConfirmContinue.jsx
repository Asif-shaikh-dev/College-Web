import React, { useContext, useEffect } from 'react';

import StudentLoginHeader from '../components/studentLoginHeader';
import '../CssComponents/studentInfo.css';
import '../CssComponents/sidebar.css';
import '../CssComponents/studentPayment.css'
import { useState } from 'react';
import StudentContext, { StudentDataContext } from '../context/StudentContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CssComponents/AddmissionStudent.css'
import '../CssComponents/UpdateStudentData.css'


const Login_8StudRegistrationInfoConfirmContinue = () => {


    const navigate = useNavigate();

    useEffect(() => {
        const resetRequested = localStorage.getItem("StudentLogin", "true");
        if (!resetRequested) {
            toast.error("You are not authorized to access this page");
            navigate("/"); // Redirect if no request was made
        }
    }, []);
    // const handleChangePassword = () => {
    //     navigate("/change-password"); // Redirect to Change Password page
    // };

    const { student, setStudent, backendUrl, selectedMenu, setSelectedMenu } = useContext(StudentDataContext)

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isToggled, setIsToggled] = useState(false); // For sidebar button rotation
    const [FormStatus, setFromStatus] = useState('')
    // const[isFormRejected,setIsFromRejected] = useState(false)

    // const [selectedMenu, setSelectedMenu] = useState("home");
    const [amountPaid, setAmountPaid] = useState('')

    useEffect(() => {
        if (student.status === 'Approved') {
            setFromStatus('Approved');
            // setIsFromSubmitted(true)

        } else if (student.status === 'Rejected') {
            setFromStatus('Rejected');
            // setIsFromSubmitted(true);
        } else if (student.status === 'Pending Approval') {
            setFromStatus('Pending Approval')
        } else {
            setFromStatus('Not Submmited')
        }
    }, [student.status]); // Runs only when student.status changes

    // Toggle Sidebar
    const toggleSideBar = () => {
        setSidebarOpen(!isSidebarOpen);
        setOpenDropdown(null); // Close all submenus when toggling sidebar
        setIsToggled(!isToggled);
    };



    const toggleSubMenu = (menu) => {
        if (openDropdown === menu) {
            setOpenDropdown(null);
        } else {
            // Immediately close current menu before opening new one
            setOpenDropdown(null);
            setTimeout(() => setOpenDropdown(menu), 10);
        }
        setSidebarOpen(true);
    };


    const handlePayment = async () => {
        if (!amountPaid || isNaN(amountPaid) || Number(amountPaid) <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }
        try {
            const studentId = student?.studentId;
            if (!studentId) {
                toast.error("Student information is missing.");
                return;
            }
            const response = await axios.post(
                backendUrl + "/students/update-payment",
                { amountPaid, studentId },  // Make sure the payload is an object
                { withCredentials: true }
            );

            const data = response.data;
            console.log(data)
            if (response.status === 201) {

                toast.success("Payment Done");
                setStudent((prevStudent) => ({
                    ...prevStudent,
                    feesPaid: data.feesPaid,   // Update feesPaid
                    feesRemaining: data.feesRemaining,
                }));

            }
            // console.log("Updated Student Data from API:", student);
            // console.log("Updated Student Data from API:", data.student);

        } catch (error) {
            console.error("Payment update error:", error);

            if (error.response) {
                // Server responded with a status other than 2xx
                toast.error(error.response.data.error || "Payment failed");
            } else if (error.request) {
                // Request was made but no response received
                toast.error("No response from server. Check your internet connection.");
            } else {
                // Something else went wrong
                toast.error("An unexpected error occurred.");
            }
        }


        // alert(`Proceeding to pay ₹${student.feesRemaining}`);
    }


    const handleAddmissionPayment = async () => {
        try {
            const response = await axios.post("http://localhost:4000/students/pay-admission-fee", {}, { withCredentials: true });
            const data = response.data;
            if (response.status === 201) {
                toast.success("Fee Paid")
                setStudent((prevStudent) => ({
                    ...prevStudent,
                    admissionFeePaid: data.admissionFeePaid,   // Update feesPaid
                    admissionFee: data.admissionFee,
                }));
            }
            // setMessage(response.data.message);
        } catch (error) {
            toast.error("Fee Not Paid")
            console.error("Payment Error:", error);
            // setMessage("Error processing payment.");
        }
    };

    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        gender: "",
        mobile: "",
        email: "",
        fatherName: "",
        motherName: "",
        parentContact: "",
        currAddress: "",
        tenthBoard: "",
        tenthYear: "",
        tenthPercentage: "",
        tenthMarksheet: null,

        collegeName: "",
        subjects: [],
        stream: "",
        twelfthPercentage: "",
        twelfthMarksheet: null,
        courseSelection: "",
        documents: {
            tenthMarksheet: null,
            twelfthMarksheet: null,
            lc: null,
            casteCertificate: null,
            incomeCertificate: null,
            domicile: null,
            passportPhoto: null,
            adharCard: null,
        },
    });
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({ ...prev, [name]: value })); // Update the field
    //     // console.log(name,value)
    // };

    const courseSubjects = {
        "BSC CS": {
            default: ["C++", "Java", "DBMS"],
            optional: ["Mathematics", "Statistics"]
        },
        "BBA": {
            default: ["Business Studies", "Economics"],
            optional: ["Marketing", "Finance"]
        },
        "BCom": {
            default: ["Accounting", "Business Law"],
            optional: ["Banking", "Taxation"]
        },
        "BA": {
            default: ["History", "Political Science"],
            optional: ["Sociology", "Psychology"]
        },
        "BSC": {
            default: ["Physics", "Chemistry"],
            optional: ["Mathematics", "Biology"]
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Define default and optional subjects for each course
        setFormData((prev) => {
            if (name === "courseSelection") {
                // Reset subjects when a new course is selected and add default subjects
                return {
                    ...prev,
                    [name]: value,
                    subjects: courseSubjects[value] ? [...courseSubjects[value].default] : [],
                };
            }

            if (name === "subjects") {
                const selectedSubject = value;
                const defaultSubjects = courseSubjects[prev.courseSelection]?.default || [];

                // Ensure only one optional subject is selected at a time
                return {
                    ...prev,
                    subjects: [...defaultSubjects, selectedSubject], // Keep default subjects, replace optional
                };
            }

            return {
                ...prev,
                [name]: value,
            };
        });


    };

    useEffect(() => {
        console.log(formData.subjects)
    }, [formData.subjects])

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                documents: {
                    ...prev.documents,
                    [name]: files[0], // ✅ Store file inside documents object
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formDataToSend = new FormData();
        // const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "documents") {
                formDataToSend.append(key, value);
            }
        });

        // Ensure `documents` exists
        if (formData.documents && typeof formData.documents === "object") {
            Object.entries(formData.documents).forEach(([key, file]) => {
                if (file instanceof File) {
                    formDataToSend.append(key, file);
                } else {
                    console.error(`Skipping ${key}: Not a valid file`);
                }
            });
        }


        try {
            const response = await axios.post("http://localhost:4000/vriddhi/admission", formDataToSend);

            // console.log("Admission Submitted:", response.data);

            if (response.status === 200) {
                toast.success("Admission form submitted successfully!")
                setSelectedMenu('home')
                // toggleSideBar()


                // setSelectedMenu('submmitedAddmissionFrom')
                // alert("Admission form submitted successfully!");
                // alert("Form submitted successfully!");
            } else {
                toast.error(response.data.error || "Error submitting form");
                toast.error("Error in data");
                alert("Error in data");
            }
        } catch (error) {

            console.error("Submission Error:", error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || error.message);

        }
    };



    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [newValue, setNewValue] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    // Send OTP API call
    const sendOtp = async (email) => {
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:4000/students/send-otp", { email: student.email }, { withCredentials: true });
            const data = response.data;

            if (data.success) {
                toast.success("OTP sent to your email!");
                setOtpModalOpen(true);
            } else {
                console.log(data.error)
                toast.error(data.error);
            }
        } catch (error) {
            console.error("Submission Error:", error.response?.data?.error || error.message);
            toast.error(error.response?.data?.message || error.message);
            // toast.error(error.message);
            // toast.error("Failed to send OTP");
        } finally {
            setLoading(false)
        }

    };

    // Verify OTP and update data
    const updateStudentData = async () => {
        try {
            const response = await axios.post("http://localhost:4000/students/update", { email: student.email, field: selectedField, newValue, otp });


            if (response.data.success) {
                toast.success("Data updated successfully!");
                setOtpModalOpen(false);
                setTimeout(() => {
                    window.location.reload(); // Refresh the page after success
                }, 1000);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
            // toast.error("Failed to update data");
        }
    };

    return (
        <div className='h-full student-info bg-black'>
            <StudentLoginHeader />

            <div className='grid grid-cols-[auto_1fr]'>
                <nav id="sidebar" className={`${isSidebarOpen ? "w-64" : "w-16 close"} transition-all duration-300 bg-red-500 text-white h-full p-4 fixed top-0 left-0 z-10`}>
                    <ul className=''>
                        <li className="flex items-center justify-between">

                            <span className="text-xl logo  font-bold"><p>{student?.fullname || ""}</p> </span>
                            <button onClick={toggleSideBar} className="toggle-btn cursor-pointer">
                                <svg className={`transition-transform duration-300 ${isToggled ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                    <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Z" />
                                </svg>
                            </button>
                        </li>

                        <li>
                            <button onClick={() => { setSelectedMenu('home') }} className="dropdown-btn flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" fill="currentColor"><path d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z"></path></svg>
                                <span className="ml-2">Dashboard</span>

                            </button>
                        </li>
                        <li>
                            <button onClick={() => { toggleSubMenu("create"); }} className="transition-all duration-300 dropdown-btn flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                    <path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
                                </svg>
                                <span className="ml-2">Payments And Bronchures</span>
                                <svg className={`ml-auto transition-transform ${openDropdown === "create" ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                </svg>
                            </button>

                            <ul className={`sub-menu ${openDropdown === "create" ? "show" : ""}  transition-all duration-300`}>
                                <div>
                                    <li className='cursor-pointer' ><a>View Bronchures Codes</a></li>
                                    <li onClick={() => { setSelectedMenu('payments') }}><a href="#">Pay Addmission Fee</a></li>
                                    <li onClick={() => { setSelectedMenu('PendingFee') }}><a href="#">Pay Pending Fee</a></li>
                                    <li><a href="#">Pay Miscellaneos Fee</a></li>
                                </div>
                            </ul>

                        </li>

                        <li>
                            <button onClick={() => toggleSubMenu("addmission")} className="dropdown-btn flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                    <path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z" />
                                </svg>
                                <span className="ml-2">Addmission</span>
                                <svg className={`ml-auto transition-transform ${openDropdown === "addmission" ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                </svg>
                            </button>

                            <ul className={`sub-menu ${openDropdown === "addmission" ? "show" : ""}  transition-all duration-300`}>
                                <div>
                                    <li onClick={() => { setSelectedMenu('AdmissionForm'); }}><a href="#">Fill Form</a></li>
                                    <li onClick={() => { setSelectedMenu('UpdateForm') }}><a href="#">Update Form</a></li>
                                    <li><a href="#">Print Form</a></li>
                                    <li><a href="#">Download Form</a></li>
                                    <li><a href="#">Form Submission Dates</a></li>
                                    <li><a href="#">View Fee Details</a></li>
                                    <li><a href="#">My Adm.Info</a></li>
                                </div>
                            </ul>

                        </li>
                        <li>
                            <button onClick={() => toggleSubMenu("exam")} className="dropdown-btn flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg>
                                <span className="ml-2">Exam</span>
                                <svg className={`ml-auto transition-transform ${openDropdown === "exam" ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                </svg>
                            </button>

                            <ul className={`sub-menu ${openDropdown === "exam" ? "show" : ""}  transition-all duration-300`}>
                                <div>
                                    <li><a href="#">Fill Form</a></li>
                                    <li><a href="#">Print/Update/Download</a></li>
                                    <li><a href="#">Form Submission Date</a></li>
                                    <li><a href="#">View Result</a></li>
                                    <li><a href="#">Upload Exam Form</a></li>
                                    <li><a href="#">Online Exam</a></li>
                                </div>
                            </ul>

                        </li>
                        <li>
                            <button onClick={() => toggleSubMenu("myprofile")} className="dropdown-btn flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" fill="currentColor"><path d="M21.0082 3C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z"></path></svg>
                                <span className="ml-2">My Profile</span>
                                <svg className={`ml-auto transition-transform ${openDropdown === "myprofile" ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                </svg>
                            </button>

                            <ul className={`sub-menu ${openDropdown === "myprofile" ? "show" : ""}  transition-all duration-300`}>
                                <div>
                                    <li><a href="#">Edit Profile</a></li>
                                    <li><a href="#">Change Password</a></li>

                                </div>
                            </ul>

                        </li>

                    </ul>
                </nav>
                {selectedMenu == 'home' &&
                    <div className="p-4 flex flex-col items-center justify-center w-full">
                        <h3 className="text-xl  text-gray-300 font-bold mb-4">Student Login Status</h3>
                        <div className="overflow-x-auto w-full flex justify-center ">
                            <div className="max-w-4xl w-[90%] border rounded-lg shadow-lg">
                                <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
                                    <h2 className="text-lg text-gray-300 font-bold">Your Profile</h2>
                                    <span className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21.0082 3C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z"></path></svg></span>
                                </div>
                                <div className="tableBody relative bg-black border-white">
                                    {[
                                        { label: "Registration Id", actualLabel: 'studentId', value: student?.studentId || "", editable: false },
                                        { label: "Birth Date", actualLabel: 'birthdate', value: student?.birthdate || "", editable: true },
                                        { label: "Password", actualLabel: 'password', value: "***********", editable: true },
                                        { label: "FullName", actualLabel: 'fullname', value: student?.fullname || "", editable: true },
                                        { label: "Mobile No.", actualLabel: 'mobile', value: student?.mobile || "", editable: true },
                                        { label: "Email ID (Email Not Verified)", actualLabel: 'email', value: student?.email || "", editable: true },
                                    ].map((field, index) => (
                                        <div key={index} className="mb-4 student-table">
                                            <label className="text-lg font-semibold text-white">
                                                {field.label} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={field.value}
                                                    readOnly
                                                    className="w-full p-3 border rounded-md text-black"
                                                />
                                                {field.editable && (

                                                    <button
                                                        className="bg-gray-800 cursor-pointer text-white rounded-md hover:bg-gray-700 transition p-2"
                                                        onClick={() => {
                                                            console.log('clicked')
                                                            setSelectedField(field.actualLabel);
                                                            sendOtp();
                                                        }}
                                                    >
                                                        Update {field.label.split(" ")[0]}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* OTP Modal */}
                                    {otpModalOpen && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                                            <div className="bg-black p-6 flex flex-col items-center w-[60%] rounded-lg border-2 border-gray-200 shadow-lg">
                                                <h2 className="text-xl text-white font-bold mb-4">Enter OTP</h2>

                                                {loading ? (
                                                    <div className="w-full flex flex-col items-center">
                                                        <p className="text-white">Sending OTP...</p>
                                                        <div className="w-full bg-gray-300 h-1 rounded-md overflow-hidden mt-2">
                                                            <div className="h-1 bg-blue-500 animate-pulse w-full"></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full flex flex-col gap-5 items-center justify-center">
                                                        {/* OTP Input */}
                                                        <input
                                                            type="text"
                                                            placeholder="Enter OTP"
                                                            className="student-deta-update-otp border border-gray-400 rounded-full text-white bg-black outline-none p-2 w-[70%] mb-4"
                                                            value={otp}
                                                            onChange={(e) => setOtp(e.target.value)}
                                                            disabled={loading}
                                                        />

                                                        {/* New Field Input */}
                                                        {selectedField === "birthdate" ? (
                                                            <div className="w-[70%] ">
                                                                <p className="text-white">Enter new Birthdate:</p>
                                                                <input
                                                                    type="date"
                                                                    value={newValue}
                                                                    onChange={(e) => setNewValue(e.target.value)}
                                                                    className="border student-deta-update-otp border-gray-400 rounded-full text-white bg-black outline-none p-2 w-[70%] mb-4"
                                                                    disabled={loading}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-[70%] ">
                                                                <p className="text-white">Enter new {selectedField}:</p>
                                                                <input
                                                                    type="text"
                                                                    placeholder={`Enter new ${selectedField}`}
                                                                    value={newValue}
                                                                    onChange={(e) => setNewValue(e.target.value)}
                                                                    className="border student-deta-update-otp border-gray-400 rounded-full text-white bg-black outline-none p-2 w-full mb-4"
                                                                    disabled={loading}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Buttons */}
                                                <div className="flex gap-4 otp-submit-for-edit mt-4">
                                                    <button
                                                        className={`p-2 rounded cursor-pointer ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 text-white"}`}
                                                        onClick={updateStudentData}
                                                        disabled={loading}
                                                    >
                                                        {loading ? "Processing..." : "Submit"}
                                                    </button>
                                                    <button
                                                        className="bg-red-600 cursor-pointer text-white p-2 rounded"
                                                        onClick={() => setOtpModalOpen(false)}
                                                        disabled={loading}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>}
                {selectedMenu == 'PendingFee' &&
                    <div className="studentPaymentDiv relative flex items-center   p-6 rounded-lg shadow-lg w-full ">
                        <div className='absolute top-0 left-0 h-15 w-100 '>

                            <h2 className="text-2xl  font-semibold mb-4 text-gray-200">💳 Student Fee Payment</h2>

                        </div>
                        <div className='payment-card w-full flex justify-center'>
                            <div className='bg-red-300 w-[90%] border rounded-lg shadow-lg'>
                                <div className="tableBody bg-black border-white">
                                    {[
                                        { label: "Your Id", value: student?.studentId || "", editable: false },
                                        { label: "Name", value: student?.fullname || "", editable: true },

                                        { label: "Email ID (Email Not Verified)", value: student?.email || "", editable: true },
                                        { label: "Fee Paid:", value: `$${student?.feesPaid}` || "", editable: true },
                                        { label: "Remaining Fees.", value: `$${student?.feesRemaining}` || "", editable: true },
                                    ].map((field, index) => (
                                        <div key={index} className="mb-4 student-table">
                                            <label className="text-lg font-semibold  text-black">
                                                {field.label} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={field.value}
                                                    readOnly
                                                    className="w-full p-3 border rounded-md  text-black"
                                                />

                                            </div>

                                        </div>
                                    ))}
                                    <div>
                                        {
                                            student.feesRemaining > 0 && <input disabled={student.feesRemaining === 0} className='input-amt-fees w-[50%] h-10 outline-none border border-transparent' placeholder='Enter Amount You Want To Pay' type="text" value={amountPaid} onChange={(e) => { setAmountPaid(e.target.value) }} />
                                        }

                                    </div>

                                    <button
                                        onClick={handlePayment}
                                        style={{
                                            backgroundColor: student.feesRemaining === 0 ? "green" : "blue",
                                            color: "white",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                        disabled={student.feesRemaining === 0}
                                        className={`pay-btn p-2 rounded-lg ${"bg-blue-600 text-white hover:bg-blue-700"}`}
                                    >
                                        {student.feesRemaining === 0 ? "Paid! " : `Pay $${amountPaid || "0"}`}                            </button>
                                </div>
                            </div>

                        </div>

                    </div>

                }
                {selectedMenu === 'payments' &&
                    <div className="studentPaymentDiv relative flex items-center   p-6 rounded-lg shadow-lg w-full ">
                        <div className='absolute top-0 left-0 h-15 w-100 '>

                            <h2 className="text-2xl  font-semibold mb-4 text-gray-200">💳 Student Fee Payment</h2>

                        </div>
                        <div className='payment-card w-full flex justify-center'>
                            <div className='bg-red-300 w-[90%] border rounded-lg shadow-lg'>
                                <div className="tableBody bg-black border-white">
                                    {[
                                        { label: "Your Id", value: student?.studentId || "", editable: false },
                                        { label: "Name", value: student?.fullname || "", editable: true },


                                        { label: "Addmission Fee:", value: `$${student?.admissionFee}` || "", editable: true },

                                    ].map((field, index) => (
                                        <div key={index} className="mb-4 student-table">
                                            <label className="text-lg font-semibold  text-black">
                                                {field.label} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={field.value}
                                                    readOnly
                                                    className={`w-full p-3 border rounded-md  text-black`}
                                                />

                                            </div>

                                        </div>
                                    ))}

                                    <button
                                        onClick={handleAddmissionPayment}
                                        style={{
                                            backgroundColor: student?.admissionFeePaid === true ? "green" : "blue",
                                            color: "white",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                        disabled={student?.admissionFeePaid === true}
                                        className={`pay-btn p-2 rounded-lg ${"bg-blue-600 text-white hover:bg-blue-700"}`}
                                    >
                                        {student?.admissionFeePaid === true ? "Paid! " : `Pay $${student.admissionFee || "0"}`}                            </button>
                                </div>
                            </div>

                        </div>

                    </div>
                }

                {selectedMenu === 'AdmissionForm' && FormStatus === 'Not Submmited' &&
                    <div className='relative  p-6 rounded-lg shadow-lg w-full '>
                        <div className="form-container-padding w-full  min-h-screen">
                            <form onSubmit={handleSubmit} className="form-wrapper-padding w-full   shadow-xl rounded-2xl  mx-auto">
                                <h2 className="text-3xl font-bold text-center text-indigo-400 mb-8">
                                    Student Admission Form
                                    <div className="mt-2 h-1 bg-indigo-100 w-24 mx-auto rounded-full" />
                                </h2>

                                {/* Personal Information */}
                                <div className="section-group-margin">
                                    <div className="grid grid-cols-1 md:grid-cols-2 grid-gap">
                                        <div className="flex flex-col  justify-center w-full">
                                            <p className='text-gray-200'>Name</p>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Full Name"
                                                className="input-field-padding border bg-transparent text-black border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 autofill:bg-black autofill:text-white"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Date Of Birth</p>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                className="input-field-padding border w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="section-group-margin">
                                    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
                                        <div className="flex flex-col  justify-center w-full">
                                            <p className='text-gray-200'>Gender</p>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="input-field-padding border text-white  border-gray-300 rounded-lg focus:ring-2  peer "
                                            >
                                                <option value="" className="bg-black text-white">Gender</option>
                                                <option className="bg-black text-white">Male</option>
                                                <option className="bg-black text-white">Female</option>
                                                <option className="bg-black text-white">Other</option>
                                            </select>
                                        </div>


                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Mobile No.</p>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                placeholder="Mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Email(Registered Email)</p>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>


                                    </div>
                                </div>

                                {/* Parents' Information */}
                                <div className="section-group-margin">
                                    <div className="grid grid-cols-1 md:grid-cols-2 grid-gap">
                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Father's Full Name</p>
                                            <input
                                                type="text"
                                                name="fatherName"
                                                value={formData.fatherName}
                                                onChange={handleChange}
                                                placeholder="Father's Name"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Mother's Full Name</p>
                                            <input
                                                type="text"
                                                name="motherName"
                                                value={formData.motherName}
                                                onChange={handleChange}
                                                placeholder="Mother's Name"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Parent's Contact</p>
                                            <input
                                                type="text"
                                                name="parentContact"
                                                value={formData.parentContact}
                                                onChange={handleChange}
                                                placeholder="Parent Contact No"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Address */}
                                <div className="section-group-margin">
                                    <div className="flex flex-col  justify-centerw-full">
                                        <p className='text-gray-200'>Address</p>
                                        <textarea
                                            name="currAddress"
                                            value={formData.currAddress}
                                            onInput={handleChange}
                                            placeholder="Current Address"
                                            className="textarea-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full h-20"
                                        ></textarea>
                                    </div>

                                </div>

                                <hr className=' text-gray-700' />

                                {/* 10th Details */}
                                <div className="section-group-margin">
                                    <h3 className="section-title-margin text-xl font-semibold text-indigo-400">10th Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>State Board</p>
                                            <select
                                                name="tenthBoard"
                                                value={formData.tenthBoard}
                                                onChange={handleChange}
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-white peer"
                                            >
                                                <option value="" className="bg-black text-white">Board</option>
                                                <option className="bg-black text-white">State</option>
                                                <option className="bg-black text-white">CBSE</option>
                                                <option className="bg-black text-white">Other</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Passing Year</p>
                                            <input
                                                type="number"
                                                name="tenthYear"
                                                value={formData.tenthYear}
                                                onChange={handleChange}
                                                placeholder="Passing Year"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Percentage</p>
                                            <input
                                                type="number"
                                                name="tenthPercentage"
                                                value={formData.tenthPercentage}
                                                onChange={handleChange}
                                                placeholder="Percentage"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                    <div className="file-upload-margin flex items-center ">
                                        <h2 className='text-white'>10th Marksheet:</h2>
                                        <input
                                            type="file"
                                            name="tenthMarksheet"

                                            onChange={handleFileChange}
                                            //   placeholder='Choose File'
                                            className="w-auto border border-gray-300 rounded-lg p-2"
                                        />
                                    </div>
                                </div>

                                {/* 12th Details */}
                                <div className="section-group-margin">
                                    <h3 className="section-title-margin text-xl font-semibold text-indigo-400">12th Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Stream</p>
                                            <select
                                                name="stream"
                                                value={formData.stream}
                                                onChange={handleChange}
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-white peer"
                                            >

                                                <option value="" className="bg-black text-white">Select</option>
                                                <option className="bg-black text-white">Science</option>
                                                <option className="bg-black text-white">Commerce</option>
                                                <option className="bg-black text-white">Arts</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>College Name</p>
                                            <input
                                                type="text"
                                                name="collegeName"
                                                value={formData.collegeName}
                                                onChange={handleChange}
                                                placeholder="College Name"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Percentage</p>
                                            <input
                                                type="number"
                                                name="twelfthPercentage"
                                                value={formData.twelfthPercentage}
                                                onChange={handleChange}
                                                placeholder="Percentage"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                    <div className="file-upload-margin flex items-center">
                                        <h2 className='text-white'>12th Marksheet:</h2>
                                        <input
                                            type="file"
                                            name="twelfthMarksheet"

                                            onChange={handleFileChange}
                                            className="w-auto border border-gray-300 rounded-lg p-2"
                                        />
                                    </div>
                                </div>

                                {/* Course Selection */}
                                <div className="section-group-margin">
                                    {/* Course Selection */}
                                    <div className="flex flex-col w-full">
                                        <p className="text-gray-200">Select Course</p>
                                        <select
                                            name="courseSelection"
                                            value={formData.courseSelection}
                                            onChange={handleChange}
                                            className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-white w-full"
                                        >
                                            <option value="" className="bg-black text-white">
                                                Select Course
                                            </option>
                                            {Object.keys(courseSubjects).map((course) => (
                                                <option key={course} value={course} className="bg-black text-white">
                                                    {course}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {formData.courseSelection && courseSubjects[formData.courseSelection] && courseSubjects[formData.courseSelection].optional?.length > 0 && (
                                    <div className="section-group-margin">
                                        <div className="flex flex-col w-full mt-4">
                                            <p className="text-gray-200">Select Optional Subject</p>
                                            <select
                                                name="subjects"
                                                onChange={handleChange}
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-white w-full"
                                            >
                                                <option value="" className="bg-black text-white">Select Subject</option>
                                                {courseSubjects[formData.courseSelection]?.optional.map((subject) => (
                                                    <option key={subject} value={subject} className="bg-black text-white">
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p>Selected Subjects: {formData.subjects.join(", ")}</p>
                                    </div>
                                )}

                                <div className="section-group-margin">
                                    {/* Subject Selection (only if course is selected) */}
                                    {formData.subjects.length > 0 && (
                                        <div className="section-group-margin">
                                            <div className="flex flex-col w-full mt-4">
                                                <p className="text-gray-200">Selected Subjects</p>
                                                <div className="text-white border h-10 flex items-center justify-start gap-2 border-gray-300 rounded-lg p-2">
                                                    {formData.subjects.map((subject) => (
                                                        <span key={subject} className="default-subjects-css px-2 py-1 rounded-lg m-1 flex justify-center items-center">
                                                            {subject}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Document Uploads */}
                                <div className="section-group-margin  ">
                                    <h3 className="section-title-margin text-xl font-semibold text-indigo-400">Upload Documents</h3>
                                    <div className="documents-submit-css  grid grid-cols-1 md:grid-cols-2 gap-4 w-full  p-4 rounded-lg">
                                        {[
                                            { label: "Passport Size Photo", name: "passportPhoto" },
                                            { label: "Aadhar Card", name: "adharCard" },
                                            { label: "Caste Certificate (If available)", name: "casteCertificate", bg: "bg-red-300" },
                                            { label: "Income Certificate (If available)", name: "incomeCertificate", bg: "bg-red-900" },

                                            { label: "LC:", name: "lc", bg: "bg-red-900" },
                                            { label: "Domicile:", name: "domicile", bg: "bg-red-900" },
                                        ].map((item, index) => (
                                            <div key={index} className="documents-submit-div-css flex  flex-col md:flex-row items-center gap-2 bg-gray-800 p-3 rounded-lg shadow">
                                                <h2 className={`documents-submit-h2-css text-gray-300 font-medium px-2 py-1 rounded   `}>
                                                    {item.label}
                                                </h2>
                                                <input
                                                    type="file"
                                                    name={item.name}
                                                    onChange={handleFileChange}
                                                    className="w-[50%] cursor-pointer text-gray-700 "
                                                />
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                {/* Submit Button */}
                                <button

                                    type="submit"
                                    className="submit-btn-margin bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-indigo-700 transition-colors"
                                >
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>
                }
                {selectedMenu === 'AdmissionForm' && FormStatus === 'Pending Approval' &&
                    <div className="relative flex items-center justify-center text-white   p-6 rounded-lg shadow-lg w-full ">
                        Form Submitted .. Wait for Approval
                    </div>
                }
                {selectedMenu === 'AdmissionForm' && FormStatus === 'Approved' &&
                    <div className="relative flex items-center justify-center text-white text-2xl  p-6 rounded-lg shadow-lg w-full ">
                        <p> Form <span className='text-green-600'>Approved</span> .. Contact College</p>

                    </div>
                }
                {selectedMenu === 'AdmissionForm' && FormStatus === 'Rejected' &&
                    <div className="relative flex items-center justify-center text-white text-2xl  p-6 rounded-lg shadow-lg w-full ">
                        <p> Form <span className='text-red-600'>Rejected</span> .. Contact College or <span className='text-red-600'>Update Form</span> </p>

                    </div>
                }
                   {/* {selectedMenu === 'UpdateForm' &&
                    <div className='relative flex items-center justify-center text-white text-2xl  p-6 rounded-lg shadow-lg w-full '><p><span className='text-red-600'>Fill the Form First</span></p></div>
                } */}
                {selectedMenu === 'UpdateForm' && FormStatus === 'Rejected' &&
                    <div className='relative  p-6 rounded-lg shadow-lg w-full '>
                        <div className="form-container-padding w-full  min-h-screen">
                            <form onSubmit={handleSubmit} className="form-wrapper-padding w-full   shadow-xl rounded-2xl  mx-auto">
                                <h2 className="text-3xl font-bold text-center text-indigo-400 mb-8">
                                    Student Admission Form
                                    <div className="mt-2 h-1 bg-indigo-100 w-24 mx-auto rounded-full" />
                                </h2>

                                {/* Personal Information */}
                                <div className="section-group-margin">
                                    <div className="grid grid-cols-1 md:grid-cols-2 grid-gap">
                                        <div className="flex flex-col  justify-center w-full">
                                            <p className='text-gray-200'>Name</p>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Full Name"
                                                className="input-field-padding border bg-transparent text-black border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 autofill:bg-black autofill:text-white"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Date Of Birth</p>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                className="input-field-padding border w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="section-group-margin">
                                    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
                                        <div className="flex flex-col  justify-center w-full">
                                            <p className='text-gray-200'>Gender</p>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="input-field-padding border text-white  border-gray-300 rounded-lg focus:ring-2  peer "
                                            >
                                                <option value="" className="bg-black text-white">Gender</option>
                                                <option className="bg-black text-white">Male</option>
                                                <option className="bg-black text-white">Female</option>
                                                <option className="bg-black text-white">Other</option>
                                            </select>
                                        </div>


                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Mobile No.</p>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                placeholder="Mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Email(Registered Email)</p>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>


                                    </div>
                                </div>

                                {/* Parents' Information */}
                                <div className="section-group-margin">
                                    <div className="grid grid-cols-1 md:grid-cols-2 grid-gap">
                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Father's Full Name</p>
                                            <input
                                                type="text"
                                                name="fatherName"
                                                value={formData.fatherName}
                                                onChange={handleChange}
                                                placeholder="Father's Name"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Mother's Full Name</p>
                                            <input
                                                type="text"
                                                name="motherName"
                                                value={formData.motherName}
                                                onChange={handleChange}
                                                placeholder="Mother's Name"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Parent's Contact</p>
                                            <input
                                                type="text"
                                                name="parentContact"
                                                value={formData.parentContact}
                                                onChange={handleChange}
                                                placeholder="Parent Contact No"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Address */}
                                <div className="section-group-margin">
                                    <div className="flex flex-col  justify-centerw-full">
                                        <p className='text-gray-200'>Address</p>
                                        <textarea
                                            name="currAddress"
                                            value={formData.currAddress}
                                            onInput={handleChange}
                                            placeholder="Current Address"
                                            className="textarea-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full h-20"
                                        ></textarea>
                                    </div>

                                </div>

                                <hr className=' text-gray-700' />

                                {/* 10th Details */}
                                <div className="section-group-margin">
                                    <h3 className="section-title-margin text-xl font-semibold text-indigo-400">10th Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>State Board</p>
                                            <select
                                                name="tenthBoard"
                                                value={formData.tenthBoard}
                                                onChange={handleChange}
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-white peer"
                                            >
                                                <option value="" className="bg-black text-white">Board</option>
                                                <option className="bg-black text-white">State</option>
                                                <option className="bg-black text-white">CBSE</option>
                                                <option className="bg-black text-white">Other</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Passing Year</p>
                                            <input
                                                type="number"
                                                name="tenthYear"
                                                value={formData.tenthYear}
                                                onChange={handleChange}
                                                placeholder="Passing Year"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Percentage</p>
                                            <input
                                                type="number"
                                                name="tenthPercentage"
                                                value={formData.tenthPercentage}
                                                onChange={handleChange}
                                                placeholder="Percentage"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                    <div className="file-upload-margin flex items-center ">
                                        <h2 className='text-white'>10th Marksheet:</h2>
                                        <input
                                            type="file"
                                            name="tenthMarksheet"

                                            onChange={handleFileChange}
                                            //   placeholder='Choose File'
                                            className="w-auto border border-gray-300 rounded-lg p-2"
                                        />
                                    </div>
                                </div>

                                {/* 12th Details */}
                                <div className="section-group-margin">
                                    <h3 className="section-title-margin text-xl font-semibold text-indigo-400">12th Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Stream</p>
                                            <select
                                                name="stream"
                                                value={formData.stream}
                                                onChange={handleChange}
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-white peer"
                                            >

                                                <option value="" className="bg-black text-white">Select</option>
                                                <option className="bg-black text-white">Science</option>
                                                <option className="bg-black text-white">Commerce</option>
                                                <option className="bg-black text-white">Arts</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>College Name</p>
                                            <input
                                                type="text"
                                                name="collegeName"
                                                value={formData.collegeName}
                                                onChange={handleChange}
                                                placeholder="College Name"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="flex flex-col  justify-centerw-full">
                                            <p className='text-gray-200'>Percentage</p>
                                            <input
                                                type="number"
                                                name="twelfthPercentage"
                                                value={formData.twelfthPercentage}
                                                onChange={handleChange}
                                                placeholder="Percentage"
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                    <div className="file-upload-margin flex items-center">
                                        <h2 className='text-white'>12th Marksheet:</h2>
                                        <input
                                            type="file"
                                            name="twelfthMarksheet"

                                            onChange={handleFileChange}
                                            className="w-auto border border-gray-300 rounded-lg p-2"
                                        />
                                    </div>
                                </div>

                                {/* Course Selection */}
                                <div className="section-group-margin">
                                    {/* Course Selection */}
                                    <div className="flex flex-col w-full">
                                        <p className="text-gray-200">Select Course</p>
                                        <select
                                            name="courseSelection"
                                            value={formData.courseSelection}
                                            onChange={handleChange}
                                            className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-white w-full"
                                        >
                                            <option value="" className="bg-black text-white">
                                                Select Course
                                            </option>
                                            {Object.keys(courseSubjects).map((course) => (
                                                <option key={course} value={course} className="bg-black text-white">
                                                    {course}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {formData.courseSelection && courseSubjects[formData.courseSelection] && courseSubjects[formData.courseSelection].optional?.length > 0 && (
                                    <div className="section-group-margin">
                                        <div className="flex flex-col w-full mt-4">
                                            <p className="text-gray-200">Select Optional Subject</p>
                                            <select
                                                name="subjects"
                                                onChange={handleChange}
                                                className="input-field-padding border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-white w-full"
                                            >
                                                <option value="" className="bg-black text-white">Select Subject</option>
                                                {courseSubjects[formData.courseSelection]?.optional.map((subject) => (
                                                    <option key={subject} value={subject} className="bg-black text-white">
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p>Selected Subjects: {formData.subjects.join(", ")}</p>
                                    </div>
                                )}

                                <div className="section-group-margin">
                                    {/* Subject Selection (only if course is selected) */}
                                    {formData.subjects.length > 0 && (
                                        <div className="section-group-margin">
                                            <div className="flex flex-col w-full mt-4">
                                                <p className="text-gray-200">Selected Subjects</p>
                                                <div className="text-white border h-10 flex items-center justify-start gap-2 border-gray-300 rounded-lg p-2">
                                                    {formData.subjects.map((subject) => (
                                                        <span key={subject} className="default-subjects-css px-2 py-1 rounded-lg m-1 flex justify-center items-center">
                                                            {subject}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Document Uploads */}
                                <div className="section-group-margin  ">
                                    <h3 className="section-title-margin text-xl font-semibold text-indigo-400">Upload Documents</h3>
                                    <div className="documents-submit-css  grid grid-cols-1 md:grid-cols-2 gap-4 w-full  p-4 rounded-lg">
                                        {[
                                            { label: "Passport Size Photo", name: "passportPhoto" },
                                            { label: "Aadhar Card", name: "adharCard" },
                                            { label: "Caste Certificate (If available)", name: "casteCertificate", bg: "bg-red-300" },
                                            { label: "Income Certificate (If available)", name: "incomeCertificate", bg: "bg-red-900" },

                                            { label: "LC:", name: "lc", bg: "bg-red-900" },
                                            { label: "Domicile:", name: "domicile", bg: "bg-red-900" },
                                        ].map((item, index) => (
                                            <div key={index} className="documents-submit-div-css flex  flex-col md:flex-row items-center gap-2 bg-gray-800 p-3 rounded-lg shadow">
                                                <h2 className={`documents-submit-h2-css text-gray-300 font-medium px-2 py-1 rounded   `}>
                                                    {item.label}
                                                </h2>
                                                <input
                                                    type="file"
                                                    name={item.name}
                                                    onChange={handleFileChange}
                                                    className="w-[50%] cursor-pointer text-gray-700 "
                                                />
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                {/* Submit Button */}
                                <button

                                    type="submit"
                                    className="submit-btn-margin bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-indigo-700 transition-colors"
                                >
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>

                }
                {selectedMenu === 'UpdateForm' && FormStatus === 'Pending Approval' &&
                    <div className='relative flex items-center justify-center text-white   p-6 rounded-lg shadow-lg w-full '>  Form Submitted .. Wait for Approval</div>
                }
                {selectedMenu === 'UpdateForm' && FormStatus === 'Approved' &&
                    <div className='relative flex items-center justify-center text-white text-2xl  p-6 rounded-lg shadow-lg w-full '><p> Form <span className='text-green-600'>Approved</span> .. Contact College</p></div>
                }
                {selectedMenu === 'UpdateForm' && FormStatus === 'Not Submmited' &&
                    <div className='relative flex items-center justify-center text-white text-2xl  p-6 rounded-lg shadow-lg w-full '><p> <span className='text-red-600'>Fill the form first...</span></p></div>
                }
             

            </div>

            {/* <div className=' bg-black'>
                <h1 className='font-bold status text-lg text-white'>Student Status:</h1>
            </div> */}
        </div>
    );
};

export default Login_8StudRegistrationInfoConfirmContinue;