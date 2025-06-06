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
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/vriddhi/pending-approvals`, { withCredentials: true });
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
            await axios.post(`${import.meta.env.VITE_BASE_URL}/vriddhi/approveStudent`, { studentId });
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
            await axios.post(`${import.meta.env.VITE_BASE_URL}/vriddhi/rejectStudent`, { studentId });
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
        <div className="w-full min-h-screen bg-black text-white overflow-auto">
        {/* Header */}
        <header
          className="flex flex-wrap justify-between items-center text-center shadow-sm relative"
          style={{ padding: '24px 16px' }}
        >
          <img
            src="https://aisc.vriddhionline.com/_0DataCenter/AZAMCAMPUS.AISC/AZAMCAMPUS.AISC_Logo.jpg"
            alt="College Logo"
            className="w-16 md:w-24 absolute right-0 top-0 md:left-4 md:top-4 md:static md:relative"
          />
          <div
            className="flex flex-col justify-center items-center flex-1 gap-2"
            style={{ marginTop: '16px' }}
          >
            <h1 className="text-xl md:text-3xl font-bold text-green-400">Pending Approvals</h1>
            <p className="text-sm md:text-base text-gray-300">
              Below is a list of students awaiting approval. Review their details carefully before making a decision.
            </p>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem("OwnertryToAccess");
              navigate('/');
              toast.success("Logged Out");
            }}
            className="bg-red-700 text-white font-semibold rounded-full hover:bg-red-600 cursor-pointer"
            style={{ height: '40px', width: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}
          >
            Logout
          </div>
        </header>
      
        {/* Approval Table Wrapper */}
        <div className="w-full overflow-x-auto" style={{ marginTop: '24px', padding: '0 16px' }}>
          <h2 style={{ marginBottom: '12px' }}>Pending Approvals</h2>
          <table className="min-w-[1000px] border border-gray-300 text-sm md:text-base">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th style={{ padding: '8px 16px', whiteSpace: 'nowrap' }}>Student ID</th>
                <th style={{ padding: '8px 16px', whiteSpace: 'nowrap' }}>Full Name</th>
                <th style={{ padding: '8px 16px', whiteSpace: 'nowrap' }}>Email</th>
                {/* ... more columns ... */}
                <th style={{ padding: '8px 16px', whiteSpace: 'nowrap' }}>Approve/Reject</th>
              </tr>
            </thead>
            <tbody>
              {approvals.length > 0 ? (
                approvals.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td style={{ padding: '8px 16px' }}>{student.studentId}</td>
                    <td style={{ padding: '8px 16px' }}>{student.fullname}</td>
                    <td style={{ padding: '8px 16px' }}>{student.email}</td>
                    {/* ...more data... */}
                    <td style={{ padding: '8px 16px' }}>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setApprove(student)}
                          className="bg-green-500 text-white rounded hover:bg-green-600"
                          style={{ padding: '8px', width: '100%' }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setReject(student)}
                          className="bg-red-500 text-white rounded hover:bg-red-600"
                          style={{ padding: '8px', width: '100%' }}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-red-600">
                  <td colSpan="26" style={{ textAlign: 'center', padding: '16px' }}>
                    No pending approvals
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      

    );
};

export default ApprovalList;
