import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { message, Table} from 'antd';

function Searchelement(){
  
  const [filterData, setFilterData] = useState([]); 
  const [tableData, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

    useEffect(()=>{
        getData();
    },[]);

    const data = searchText ? filterData : tableData;

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

    const filter = (event: React.KeyboardEvent<HTMLInputElement>) =>{
        const searchText = event.currentTarget.value.toLowerCase();
        setSearchText(searchText);
        const result = tableData.filter((element: any) =>{
            return element?.firstName?.toLowerCase().includes(searchText);
        });
        setFilterData(result);
  }

    const columns=[
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
  }
];
    return (
        <div>
          <div>
              <h1>Search The User</h1>
              <input type="text" onKeyUp={filter} placeholder="Enter the firstname to search"/>
          </div>
          <div>
           <Table 
              dataSource={data} 
              columns={columns}
           />
           </div>
        </div>
    )
};


export default Searchelement;