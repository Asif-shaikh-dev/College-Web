import { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState([])
const navigate = useNavigate();
// const resetRequested = localStorage.setItem("");

  
  
      useEffect(() => {
        const resetRequested = localStorage.getItem("teacherLoggedINBro");
        if (!resetRequested) {
          toast.error("You are not authorized to access this page");
          navigate("/"); // Redirect if no request was made
        }
      }, []);


  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/teacher/students", {
        withCredentials: true
      });

      console.log("Full Response:", response); // ✅ Debugging: Check full response

      if (response.data.success) {
        setStudents(response.data.data); // ✅ Access response.data.data
        setTeacher(response.data.teacher);


        console.log("Students Data:", response.data.data);
      } else {
        console.log("Error Response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="mx-auto p-4 h-screen bg-black">
      <h2 className="text-xl w-full text-center text-white font-bold mb-4">{teacher.name} <span className="text-blue-300">({teacher.subject})</span>  - List Of Students </h2>
      <div style={{padding:'5px'}} onClick={()=>{localStorage.removeItem("teacherLoggedINBro");navigate('/');toast.success("Logged Out!")}} className="fixed tacher-dashboard-logout top-5 right-5 p-4 cursor-pointer bg-white shadow-md rounded-md">
       Logout
      </div>

      <table className="w-full text-center  border-gray-300">
       <thead>
          <tr className="bg-gray-200 ">
            <th className=" border-gray-300 px-4 py-2 ">Student ID</th>
            <th className=" border-gray-300 px-4 py-2">Name</th>
            <th className=" border-gray-300 px-4 py-2">Email</th>
            <th className=" border-gray-300 px-4 py-2">12th Percentage</th>
            <th className=" border-gray-300 px-4 py-2">Address</th>
            <th className=" border-gray-300 px-4 py-2">Fees Remaining</th>
            <th className=" border-gray-300 px-4 py-2">Gender</th>
            <th className=" border-gray-300 px-4 py-2">Mobile</th>
            <th className=" border-gray-300 px-4 py-2">Parent Contact</th>
            <th className=" border-gray-300 px-4 py-2">Father's Name</th>
          </tr>
       </thead>
       <tbody>
           {students.map((student) => (
            <tr key={student._id} className="text-black">
              <td className="border  border-gray-300 px-4 py-2">{student.studentId}</td>
              <td className="border border-gray-300 px-4 py-2">{student.fullname}</td>
              <td className="border border-gray-300 px-4 py-2">{student.email}</td>
              <td className="border border-gray-300 px-4 py-2">{student.twelfthPercentage}%</td>
              <td className="border border-gray-300 px-4 py-2">{student.currAddress}</td>
              <td className="border border-gray-300 px-4 py-2">₹{student.feesRemaining}</td>
              <td className="border border-gray-300 px-4 py-2">{student.gender}</td>
              <td className="border border-gray-300 px-4 py-2">{student.mobile}</td>
              <td className="border border-gray-300 px-4 py-2">{student.parentContact}</td>
              <td className="border border-gray-300 px-4 py-2">{student.fatherName}</td>
            </tr>
          ))}
       </tbody>
       
       
      </table>
    </div>

  );
};

export default TeacherDashboard;
