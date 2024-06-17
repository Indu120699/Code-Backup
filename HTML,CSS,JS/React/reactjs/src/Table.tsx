import React, { useEffect, useState} from 'react';
import { Button, message, Space, Table, Tag} from 'antd';
import axios from 'axios';
import Forms from './Employee';

const Tab = () => {

    const [tableData,setData]=useState<Array<any>>([]);
    const [Add,setAdd]=useState(true);
    const [Delete,setDelete]=useState(false);

    useEffect(()=>{
        getData();
    }, [])

    const getData=()=>{
        axios({
        method: 'get', 
        headers: {'Content-Type': 'application/json'},
       
        url: "/api/Employee",
    } ).then((r:any) => {
        console.log(r.data);
        setData(r.data);
        message.success("ValueLoaded");
    }).catch((error:any) => {
        message.error(error.message);
    })
};

const addRow = () => {
     setData([...tableData, {}]);
    setAdd(false);
    setDelete(true);
    };
    
    const deleteRow = () => {
    setData(tableData.slice(0, -1));
    setAdd(true);
    setDelete(false);
    };


const columns:any = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'empname',
        dataIndex: 'empname',
        key: 'empname',
    },
    {
        title: 'address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'phoneno',
        dataIndex: 'phoneno',
        key: 'phoneno',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
]

return(
    <div>
        <Table columns={columns} dataSource={tableData} />
     <Button type="primary" onClick={addRow} disabled={!Add}> Add row</Button>
<Button type="primary" onClick={deleteRow} disabled={!Delete}> Delete row</Button>
</div>
)

}
export default Tab;