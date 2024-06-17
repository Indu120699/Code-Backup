import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { message} from 'antd';
const Mapelement=()=>{

    const [filterData, setFilterData] = useState([]); 
    const [tableData, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const data = searchText ? filterData : tableData;
  
    useEffect(()=>{
        getData();
    },[]);

    const getData=()=>{
     axios({
    method: 'get',
    headers: {'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', 
             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',},
     url: "/api/Employee",
    }).then((r:any) => {
        console.log(r.data)
        setData(r.data);
        message.success("The value has been Loaded to the table");
    }).catch((error) => {
        message.error(error.response.data.message); });
    };

     const filter = (event: React.KeyboardEvent<HTMLInputElement>) =>
    {
    const searchText = event.currentTarget.value.toLowerCase();
    setSearchText(searchText);
   const result = tableData.filter((element: any) =>
  {
  return element?.lastName?.toLowerCase().includes(searchText);
  });
   setFilterData(result);
  }

    const columns:any=[
     {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
     },
  {
    title: 'firstName',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'lastName',
    dataIndex: 'lastName',
    key: 'lastName',
  },
 {
    title:'email',
    dataIndex:'email',
    key:'email',
 },
   
  {
    title: 'phone',
    dataIndex:'phone',
    key: 'phone',
  },

];
    return (
        <div>
          <h1>Mapping</h1>
          <input type="text" onKeyUp={filter} placeholder="Enter the lastname to search"/>
         {data.map((s:any)=>{
            return(
                <div>{s.lastName}</div>
            )
         })}
        </div>
    );
};


export default Mapelement;