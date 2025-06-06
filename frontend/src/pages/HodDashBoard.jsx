import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import '../CssComponents/hodDashboard.css'
import { useNavigate } from "react-router-dom";
const PendingTeachers = () => {
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [department, setDepartment] = useState("BSC CS");
  const navigate = useNavigate();

  const fetchPendingTeachers = async () => {

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/hod/pending-teachers/${department}`);
      setPendingTeachers(res.data);
      console.log(res.data)
    } catch (error) {
      toast.error("Error fetching pending teachers:", error)
      console.error("Error fetching pending teachers:", error);
    }
  };

  useEffect(() => {
    const trial = localStorage.getItem('HODLoggedINBro')
    if(!trial){
      toast.error("You are not authorized to access this page");
      navigate("/"); // Redirect if no request was made
    }

  })
  useEffect(() => {
    fetchPendingTeachers();
    // console.log("Department:", department);
  }, [department]); // Include department in dependency array if it changes

  const approveTeacher = async (teacherId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/hod/approve-teacher`, { teacherId });
      setPendingTeachers((prev) => prev.filter((t) => t._id !== teacherId));
      toast.success("Teacher approved successfully");
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  return (
    <div className="mx-auto hod-dashboard p-6 min-h-screen bg-black">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Pending Teachers</h2>

      {/* Department Selection Dropdown */}
      <div className="fixed top-5 right-5 p-4 flex bg-black gap-2 shadow-md rounded-md">
        <select
          className="p-3  border border-gray-300 rounded-lg shadow-md bg-black text-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer focus:border-blue-500 transition duration-300 ease-in-out"
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option className="text-gray-300 cursor-pointer" value="BSC CS">BSC CS</option>
          <option className="text-gray-300 cursor-pointer" value="BSC IT">BSC IT</option>
          <option className="text-gray-300 cursor-pointer" value="BSC Maths">BSC Maths</option>
          <option className="text-gray-300 cursor-pointer" value="BSC Physics">BSC Physics</option>
        </select>

        <div onClick={()=>{localStorage.removeItem("HODLoggedINBro");navigate('/');toast.success("Logged Out!")}} style={{padding:'2px'}} className="text-red-400 bg-black border border-gray-300 rounded-md font-semibold ">Logout</div>

      </div>

      {/* Pending Teachers Table */}
      <div className="overflow-x-auto">
        <table className="w-full hod-dahsboard-table bg-black border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-black text-gray-800">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Subject</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingTeachers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No pending requests
                </td>
              </tr>
            ) : (
              pendingTeachers.map((teacher) => (
                <tr key={teacher._id} className="text-center bg-black">
                  <td className="border border-gray-300 px-4 py-2 hover:bg-gray-800">{teacher.name}</td>
                  <td className="border border-gray-300 px-4 py-2 hover:bg-gray-800">{teacher.email}</td>
                  <td className="border border-gray-300 px-4 py-2 hover:bg-gray-800">{teacher.subject}</td>
                  <td className="border border-gray-300 px-4 py-2 hover:bg-gray-800">{teacher.department}</td>
                  <td className="border border-gray-300 px-4 py-2 hover:bg-gray-800">
                    <button
                      onClick={() => approveTeacher(teacher._id)}
                      className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default PendingTeachers;
