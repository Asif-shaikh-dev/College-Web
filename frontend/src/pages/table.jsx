import React, { useState } from "react";

import '../CssComponents/table.css'


const TableSwitcher = () => {
  const [category, setCategory] = useState("undergraduate");

  const undergraduateData = [
    { id: 1, course: "B.A", name: "Ms. Shilpa Ammanagi / Shaikh Shafiya", mobile: "9503676576" },
    { id: 2, course: "B.Com", name: "Ms. Nazia Maldar", mobile: "9405954806" },
    { id: 3, course: "B.Sc", name: "Dr. Naseem Deshpande", mobile: "9420496820" },
    { id: 4, course: "B.Sc. (Comp.Sci.)", name: "Ms. Sadiya Inamdar", mobile: "8446451754 / 9623623639" },
    { id: 5, course: "BBA", name: "Ms. Ameena Sabooni", mobile: "8766460520" },
  ];

  const postgraduateData = [
    { id: 1, course: "M.Com", name: "Ms. Shirin Naaz", mobile: "9637817755" },
    { id: 2, course: "M.Sc Maths", name: "Yashwant Madke", mobile: "8830726741" },
    { id: 3, course: "M.Sc Chemistry", name: "Siraj Shaikh", mobile: "9922570014" },
    { id: 4, course: "M.Sc Microbiology", name: "Dr. Madhavi Rane", mobile: "9850575313" },
    { id: 5, course: "M.Sc Comp Sc", name: "Sana Shaikh", mobile: "9403190799" },
    { id: 6, course: "M.A English", name: "Shaheen Patel", mobile: "—" },
    { id: 7, course: "M.A Economics", name: "Rahul More", mobile: "8793637776" },
    { id: 8, course: "M.A Urdu", name: "Mehjabeen Shaikh", mobile: "7263044987" },
    { id: 9, course: "M.A Sociology", name: "Shafia Shaikh", mobile: "9503676576" },
    { id: 10, course: "M.A Pol. Sci.", name: "Ali Malegaonkar", mobile: "9049741447" },
  ];

  const tableData = category === "undergraduate" ? undergraduateData : postgraduateData;

  return (
    <div className="w-full">
    {/* Button Group */}
    <div
      className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4"
      style={{ padding: '1rem' }}
    >
      <button
        onClick={() => setCategory("undergraduate")}
        className={`rounded text-white font-medium ${
          category === "undergraduate" ? "bg-blue-600" : "bg-gray-500"
        } hover:bg-blue-700 transition`}
        style={{ padding: '0.5rem 1.5rem' }}
      >
        UNDERGRADUATE
      </button>
      <button
        onClick={() => setCategory("postgraduate")}
        className={`rounded text-white font-medium ${
          category === "postgraduate" ? "bg-blue-600" : "bg-gray-500"
        } hover:bg-blue-700 transition`}
        style={{ padding: '0.5rem 1.5rem' }}
      >
        POST GRADUATE
      </button>
    </div>
  
    {/* Table */}
    <div className="overflow-x-auto" style={{ padding: '0 4rem' }}>
      <table className="min-w-full border border-gray-500 text-white text-sm">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="border px-4 py-2">Sr. No.</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Name of Staff</th>
            <th className="border px-4 py-2">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
            >
              <td className="border px-4 py-2">{row.id}</td>
              <td className="border px-4 py-2">{row.course}</td>
              <td className="border px-4 py-2">{row.name}</td>
              <td className="border px-4 py-2">{row.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default TableSwitcher;
