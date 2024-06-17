// import React, { useState } from "react";

// const TimesheetTable = () => {
//   const [selectedYear, setSelectedYear] = useState(null);

//   const handleYearClick = (year:any) => {
//     setSelectedYear(year);
//   };

//   const tableData = [
//     {
//       col_id: 1,
//       year: 2022,
//       time_sheet: "Sheet 1",
//       timesheet_sent: "Yes",
//       approved: "Yes",
//       rejected: "No",
//       approvals_remaining: 0,
//     },
//     {
//       col_id: 2,
//       year: 2022,
//       time_sheet: "Sheet 2",
//       timesheet_sent: "Yes",
//       approved: "No",
//       rejected: "Yes",
//       approvals_remaining: 1,
//     },
//     {
//       col_id: 3,
//       year: 2023,
//       time_sheet: "Sheet 3",
//       timesheet_sent: "No",
//       approved: "-",
//       rejected: "-",
//       approvals_remaining: "-",
//     },
//     {
//       col_id: 4,
//       year: 2023,
//       time_sheet: "Sheet 4",
//       timesheet_sent: "No",
//       approved: "-",
//       rejected: "-",
//       approvals_remaining: "-",
//     },
//   ];

//   const filteredData = selectedYear
//     ? tableData.filter((item) => item.year === selectedYear)
//     : [];

//   return (
//     <div>
//       <h2>Timesheet Table</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Column ID</th>
//             <th>Year</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((item) => (
//             <tr key={item.col_id}>
//               <td>{item.col_id}</td>
//               <td
//                 onClick={() => handleYearClick(item.year)}
//                 style={{ cursor: "pointer" }}
//               >
//                 {item.year}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {selectedYear && (
//         <>
//           <h3>Timesheet Table ({selectedYear})</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Column ID</th>
//                 <th>Time Sheet</th>
//                 <th>Timesheet Sent</th>
//                 <th>Approved</th>
//                 <th>Rejected</th>
//                 <th>Approvals Remaining</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item) => (
//                 <tr key={item.col_id}>
//                   <td>{item.col_id}</td>
//                   <td>{item.time_sheet}</td>
//                   <td>{item.timesheet_sent}</td>
//                   <td>{item.approved}</td>
//                   <td>{item.rejected}</td>
//                   <td>{item.approvals_remaining}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default TimesheetTable;
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import { Table, message } from "antd";
import axios from "axios";

function TimesheetTable() {
  const [yearData, setYearData] = useState([]);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    {
      title: "SerialNo",
      dataIndex: "S.No",
      key: "S.No",
      render: (_value: any, _item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (
        text:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | ReactFragment
          | ReactPortal
          | null
          | undefined,
        record: { year: any }
      ) => <a onClick={() => getData(record.year)}>{text}</a>,
    },
  ];

  const getData = (val: any) => {
    axios({
      method: "get",
      headers: { "Content-Type": "application/json" },
      url: "/api/Admin/GetTimeSheetStatus",
    })
      .then((r: any) => {
        console.log(r.data);
        setYearData(r.data);
        message.success("ValueLoaded");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };


  return (
    <>
      <Table dataSource={yearData} columns={columns} />
      {/* <Table dataSource={timeSheetData} columns={timeSheetColumns} /> */}
    </>
  );
}

const timeSheetColumns = [
  {
    title: "ID",
    dataIndex: "col_id",
    key: "col_id",
  },
  {
    title: "Time Sheet",
    dataIndex: "time_sheet",
    key: "time_sheet",
  },
  {
    title: "Time Sheet Sent",
    dataIndex: "time_sheet_sent",
    key: "time_sheet_sent",
  },
  {
    title: "Approved",
    dataIndex: "approved",
    key: "approved",
  },
  {
    title: "Rejected",
    dataIndex: "rejected",
    key: "rejected",
  },
  {
    title: "Approvals Remaining",
    dataIndex: "approvals_remaining",
    key: "approvals_remaining",
  },
];

export default TimesheetTable;
