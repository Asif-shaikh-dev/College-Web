import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../CssComponents/ApprovalList.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ApprovalList = () => {
    const [approvals, setApprovals] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      const resetRequested = localStorage.getItem("OwnertryToAccess");
      if (!resetRequested) {
        toast.error("You are not authorized to access this page");
        navigate("/"); // Redirect if no request was made
      }
    }, []);
    const fetchApprovals = async () => {
        try {
            const response = await axios.get('https://college-web-backend-6opl.onrender.com/vriddhi/pending-approvals', { withCredentials: true });
            setApprovals(Array.isArray(response.data) ? response.data : []);
            // setApprovals(response.data);

            // const response = await axios.get('http://localhost:4000/vriddhi/approval', { withCredentials: true });
            // setApprovals(response.data);

            // console.log(response.status)
            // console.log("API Response:", response.data);
        } catch (error) {
            toast.error(error.response.data.message || "Failed to fetch approvals");
            console.error("Error fetching approvals:", error.response?.data?.error || error.message);
        }
    };
    useEffect(() => {
        fetchApprovals();
    }, []);

    const onApprove = async (studentId) => {
        try {
            // Make an API call to approve the student
            await axios.post("https://college-web-backend-6opl.onrender.com/vriddhi/approveStudent", { studentId });
            // console.log("Approved student:", studentId);

            toast.success("Student Approved")
            // Optionally re-fetch the approvals or update state
            fetchApprovals();
        } catch (error) {
            toast.error(error.response.data.message || "Failed to approve student bro!");
            console.error("Error approving student:", error);
        }
    };

    // Reject function
    const onReject = async (studentId) => {
        try {
            // Make an API call to reject the student
            await axios.post("https://college-web-backend-6opl.onrender.com/vriddhi/rejectStudent", { studentId });
            // console.log("Rejected student:", studentId);
            toast.success("Student Rejected!")

            // Optionally re-fetch the approvals or update state
            fetchApprovals();
        } catch (error) {
            console.error("Error rejecting student:", error);
        }
    };




    const [selectedImage, setSelectedImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [reject, setReject] = useState(null)
    const [approve, setApprove] = useState(false)
    return (
        <div className="w-full h-screen overflow-auto bg-black">
            {/* Header Section */}
            <header className="approval-page-header flex items-center justify-evenly  text-center  shadow-sm py-6 px-4 md:px-8">
                <img
                    src="https://aisc.vriddhionline.com/_0DataCenter/AZAMCAMPUS.AISC/AZAMCAMPUS.AISC_Logo.jpg"
                    alt="College Logo"
                    className="w-23 absolute left-[10px]  "
                />
                <div>

                </div>
                <div className='flex justify-center  flex-col gap-3'>
                    <h1 className="text-3xl font-bold text-green-400">
                        Pending Approvals
                    </h1>
                    <p className="text-gray-300 mt-2">
                        Below is a list of students awaiting approval. Review their details
                        carefully before making a decision.
                    </p>
                </div>
                <div onClick={()=>{localStorage.removeItem("OwnertryToAccess");navigate('/');toast.success("Logged Out")}} className='text-white font-semibold cursor-pointer h-10 w-20 flex items-center justify-center bg-red-700 rounded-full'>
                    Logout
                </div>

            </header>

            {/* Action Buttons or Extra Elements */}
            <h2>Pending Approvals</h2>
            <div className="w-full overflow-x-auto approval-list-table">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        {approvals.length > 0 &&
                            <tr>
                                <th className="px-4 py-2 whitespace-nowrap">Student ID</th>
                                <th className="px-4 py-2 whitespace-nowrap">Full Name</th>
                                <th className="px-4 py-2 whitespace-nowrap">Email</th>
                                <th className="px-4 py-2 whitespace-nowrap">Course Selection</th>
                                <th className="px-4 py-2 whitespace-nowrap">Gender</th>
                                <th className="px-4 py-2 whitespace-nowrap">Mobile</th>
                                <th className="px-4 py-2 whitespace-nowrap">Father Name</th>
                                <th className="px-4 py-2 whitespace-nowrap">Mother Name</th>
                                <th className="px-4 py-2 whitespace-nowrap">Parent Contact</th>
                                <th className="px-4 py-2 whitespace-nowrap">Current Address</th>
                                <th className="px-4 py-2 whitespace-nowrap">10th Board</th>
                                <th className="px-4 py-2 whitespace-nowrap">10th Year</th>
                                <th className="px-4 py-2 whitespace-nowrap">10th Percentage</th>

                                <th className="px-4 py-2 whitespace-nowrap">College Name</th>

                                <th className="px-4 py-2 whitespace-nowrap">Stream</th>
                                <th className="px-4 py-2 whitespace-nowrap">12th Percentage</th>
                                <th className="px-4 py-2 whitespace-nowrap">Status</th>
                                <th className="px-4 py-2 whitespace-nowrap">Adhar Card</th>
                                <th className="px-4 py-2 whitespace-nowrap">Leaving Certificate</th>
                                <th className="px-4 py-2 whitespace-nowrap">10th Marksheet</th>
                                <th className="px-4 py-2 whitespace-nowrap">12th Marksheet</th>
                                <th className="px-4 py-2 whitespace-nowrap">Caste Certificate</th>
                                <th className="px-4 py-2 whitespace-nowrap">Income Certificate</th>
                                <th className="px-4 py-2 whitespace-nowrap">Domicile</th>

                                <th className="px-4 py-2 whitespace-nowrap">Photo</th>
                                <th className="px-4 py-2 whitespace-nowrap">Approve/Reject</th>

                            </tr>
                        }

                    </thead>
                    <tbody>
                        {approvals.length > 0 ? (
                            approvals.map((student) => (
                                <tr key={student._id} className="border-b ">
                                    <td className="px-4 py-2">{student.studentId}</td>
                                    <td className="px-4 py-2">{student.fullname}</td>
                                    <td className="px-4 py-2">{student.email}</td>
                                    <td className="px-4 py-2">{student.courseSelection}</td>
                                    <td className="px-4 py-2">{student.gender}</td>
                                    <td className="px-4 py-2">{student.mobile}</td>
                                    <td className="px-4 py-2">{student.fatherName}</td>
                                    <td className="px-4 py-2">{student.motherName}</td>
                                    <td className="px-4 py-2">{student.parentContact}</td>
                                    <td className="px-4 py-2">{student.currAddress}</td>
                                    <td className="px-4 py-2">{student.tenthBoard}</td>
                                    <td className="px-4 py-2">{student.tenthYear}</td>
                                    <td className="px-4 py-2">{student.tenthPercentage}</td>
                                    <td className="px-4 py-2">{student.collegeName}</td>

                                    <td className="px-4 py-2">{student.stream}</td>
                                    <td className="px-4 py-2">{student.twelfthPercentage}</td>
                                    <td className="px-4 py-2">{student.status}</td>


                                    <td className="px-4 py-2">
                                        {student.documents?.adharCard && (
                                            // max-w-full max-h-[200px] object-contain cursor-pointer
                                            <img
                                                src={student.documents.adharCard}
                                                alt="Student"
                                                className="w-16 h-16 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImage(student.documents.adharCard);
                                                    setIsZoomed(true);
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.documents?.lc && (
                                            <img
                                                src={student.documents.lc}
                                                alt="Student"
                                                className="w-16 h-16 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImage(student.documents.lc);
                                                    setIsZoomed(true);
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.documents?.tenthMarksheet && (
                                            <img
                                                src={student.documents.tenthMarksheet}
                                                alt="Student"
                                                className="w-16 h-16 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImage(student.documents.tenthMarksheet);
                                                    setIsZoomed(true);
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.documents?.twelfthMarksheet && (
                                            <img
                                                src={student.documents.twelfthMarksheet}
                                                alt="Student"
                                                className="w-16 h-16 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImage(student.documents.twelfthMarksheet);
                                                    setIsZoomed(true);
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.documents?.casteCertificate && (
                                            <img
                                                src={student.documents.casteCertificate}
                                                alt="Student"
                                                className="w-16 h-16 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImage(student.documents.casteCertificate);
                                                    setIsZoomed(true);
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.documents?.incomeCertificate && (
                                            <img
                                                src={student.documents.incomeCertificate}
                                                alt="Student"
                                                className="w-16 h-16 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImage(student.documents.incomeCertificate);
                                                    setIsZoomed(true);
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.documents?.domicile && (
                                            <img
                                                src={student.documents.domicile}
                                                alt="Student"
                                                className="w-16 h-16 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImage(student.documents.domicile);
                                                    setIsZoomed(true);
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.documents?.passportPhoto && (
                                            <img
                                                src={student.documents.passportPhoto}
                                                alt="Student"
                                                className="w-16 h-16 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setSelectedImage(student.documents.passportPhoto);
                                                    setIsZoomed(true);
                                                }}
                                            />
                                        )}
                                    </td>


                                    <td className="application-approve-reject-btn px-4 py-2 flex flex-col gap-3 ">
                                        <button
                                            onClick={() => { setApprove(student) }}
                                            className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => {setReject(student)}}
                                            className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-red-600">
                                <td colSpan="19" className="text-center py-4">
                                    No pending approvals
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
                    onClick={() => setSelectedImage(null)} // Close modal on outside click
                >
                    <img
                        src={selectedImage}
                        alt="Full Size"
                        className="max-w-full max-h-full" // Ensures the image maintains its original aspect ratio
                    />
                </div>
            )}
            {reject && (
                <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} 
                    className="fixed inset-0 flex justify-center items-center"
                    onClick={() => setReject(null)} // Close modal on outside click
                >
                    <div className='w-[500px] h-[200px] bg-white flex flex-col gap-5 items-center justify-center p-6 rounded-lg shadow-lg'>
                        <p className='text-lg '>Reject <span className='font-medium'>{reject.fullname}({reject.studentId})</span> ?</p>
                        
                        <button
                            onClick={() => onReject(reject.studentId)}
                            className="bg-red-500 w-[8vw] h-[6vh] cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                        >
                            Reject
                        </button>
                    </div>

                </div>
            )}
            {approve && (
                <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} 
                    className="fixed inset-0 flex justify-center items-center"
                    onClick={() => setApprove(null)} // Close modal on outside click
                >
                    <div className='w-[500px] h-[200px] bg-white flex flex-col gap-5 items-center justify-center p-6 rounded-lg shadow-lg'>
                        <p className='text-lg '>Approve <span className='font-medium'>{approve.fullname}({approve.studentId})</span> ?</p>
                        
                        <button
                            onClick={() => onApprove(approve.studentId)}
                            className="bg-green-500 w-[8vw] h-[6vh] cursor-pointer text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                        >
                            Approve
                        </button>
                    </div>

                </div>
            )}
        </div>

    );
};

export default ApprovalList;
