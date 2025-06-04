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
    <div className="container">
      <div className="button-group">
            <button onClick={() => setCategory("undergraduate")} className={category === "undergraduate" ? "active" : ""}>
            UNDERGRADUATE
            </button>
            <button onClick={() => setCategory("postgraduate")} className={category === "postgraduate" ? "active" : ""}>
            POST GRADUATE
            </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Course</th>
              <th>Name of Staff</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{row.id}</td>
                <td>{row.course}</td>
                <td>{row.name}</td>
                <td>{row.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSwitcher;
