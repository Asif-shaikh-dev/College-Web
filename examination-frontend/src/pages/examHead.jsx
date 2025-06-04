import axios from 'axios';
// import React from 'react';
import React, { useEffect, useState } from "react";

const ExamHead = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchStudents = async () => {
        try {
            const response = await axios.post("http://localhost:5000/exam/get-students"); // ✅ No need for .json()

            if (response.data.success) {
                setStudents(response.data.students);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.log(err)
            setError("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchStudents();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
                Student Exam Seat Numbers
            </h2>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 shadow-md text-sm sm:text-base text-center">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Exam Seat No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">{student.fullname}</td>
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">{student.email}</td>
                                <td className="border border-gray-300 px-2 sm:px-4 py-2 font-semibold text-blue-600">
                                    {student.ExamSeatNO}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
};

export default ExamHead;