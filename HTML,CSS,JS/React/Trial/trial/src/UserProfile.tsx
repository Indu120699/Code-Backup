// import { Table } from "antd";
// import { useState } from "react";
// import "./EUserprofile.css";
// import { Content } from "antd/es/layout/layout";

import { Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


// const EuserPro = () => {
//   const [employeeData, setEmployeeData] = useState({
//     Employee_ID: 101,
//     Employee_Name: "Megha",
//     Type: "Fresher",
//     Designation: "External",
//     Joining_Date: "10-08-2022",
//     Email: "megha@gmail.com",
//     Mobile_Number: "6677554433",
//   });

//   return (
//     <div className="user-profile-container">
//       <h1 className="h1userprofile">User Profile</h1>
//       <Content className="contentuserpro">
//         <h2 className="h2userprofile">{employeeData.Employee_Name}</h2>

//         <div className="employee-details">
//           {Object.entries(employeeData).map(([key, value]) => (
//             <p>
//               <strong>{key} </strong> : <span className="span">{value}</span>
//             </p>
//           ))}
          
//         </div>
//       </Content>
//     </div>
//   );
// };

// export default EuserPro;



