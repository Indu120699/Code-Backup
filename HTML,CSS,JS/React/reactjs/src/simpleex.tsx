import { Form, Input } from "antd"
import { useState } from "react";

const Simpleex=()=>{
    const[inputData,setData]=useState();
    const val: any=[{name:'name'}]
    return(
        <div>
            <Form>
                <Form.Item name="name" label="name">
                    
                    <Input onChange={(e:any)=>{setData(e.target.value)}}/>
                </Form.Item>
            </Form>
        <p>{inputData}</p>
        </div>
    )
}
export default Simpleex;