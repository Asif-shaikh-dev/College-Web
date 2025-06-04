import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
    const [emailOrMobile, setEmailOrMobile] = useState("");
    const [student, setStudent] = useState(null);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // 📌 Handle Login
    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/exam/student-login", {
                studentId: emailOrMobile
            });
            const data = res.data;
            if (data.redirectTo) {
                navigate(data.redirectTo)
            } else if (data.success) {
                setStudent(data.student);
                toast.success("Login Successful!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)

            toast.error("Server error. Try again!");
        } finally {
            setLoading(false);
        }
    };

    // 📌 Handle Subject Selection
    const handleSubjectSelect = (subject) => {
        setSelectedSubjects((prevSubjects) =>
            prevSubjects.includes(subject)
                ? prevSubjects.filter((s) => s !== subject)
                : [...prevSubjects, subject]
        );
    };

    // 📌 Submit Selected Subjects
    const handleSubmitSubjects = async () => {
        if (selectedSubjects.length === 0) {
            toast.error("Please select at least one subject.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/exam/submit-subjects", {
                email: student.email,
                selectedSubjects
            });

            if (res.data.success) {
                toast.success("Subjects submitted successfully. Check your email!");
                setStudent(null);
                setSelectedSubjects([]);
                setEmailOrMobile("");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error submitting subjects. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen overflow-y-hidden-hidden relative bg-black flex flex-col items-center justify-center p-4">
            <ToastContainer />
    
            <div className="text-2xl sm:text-3xl md:text-4xl absolute top-6 font-bold text-center text-blue-400">
                📝 Examination Form Fillup
            </div>
    
            {/* Optional Head Login (uncomment if needed)
            <div className="text-sm sm:text-lg cursor-pointer bg-blue-700 rounded-md absolute top-6 right-4 text-white px-4 py-1">
                Login(Head)
            </div>
            */}
    
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full h-full max-w-sm sm:max-w-md mt-20">
                {!student ? (
                    <>
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Student Login</h2>
                        <input
                            type="text"
                            className="border w-full p-2 rounded mb-4 text-sm sm:text-base"
                            placeholder="Enter Your Registration Id"
                            value={emailOrMobile}
                            onChange={(e) => setEmailOrMobile(e.target.value)}
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-600 cursor-pointer text-white p-2 rounded text-sm sm:text-base"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg sm:text-xl font-bold mb-2">
                            Welcome, {student.name} 🎉
                        </h2>
                        <p className="mb-4 text-sm sm:text-base">
                            Selected Course: <strong>{student.selectedCourse}</strong>
                        </p>
                        <h3 className="text-base sm:text-lg font-semibold mb-2">Select Subjects</h3>
                        {student.subjects.map((subject) => (
                            <div key={subject} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={subject}
                                    checked={selectedSubjects.includes(subject)}
                                    onChange={() => handleSubjectSelect(subject)}
                                    className="mr-2"
                                />
                                <label htmlFor={subject} className="cursor-pointer text-sm sm:text-base">
                                    {subject}
                                </label>
                            </div>
                        ))}
                        <button
                            onClick={handleSubmitSubjects}
                            className="w-full bg-green-600 text-white p-2 rounded mt-4 text-sm sm:text-base"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Subjects"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
    
}
