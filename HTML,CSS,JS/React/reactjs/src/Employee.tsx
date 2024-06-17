import React from 'react';
import { Button, Checkbox, Form, Input, message, Radio, Select } from 'antd';
import Tab from './Table';
import axios from 'axios';
const {TextArea} = Input;

const postData = (values: any) => {
  console.log(values);
  axios({
  method: 'post', 
  headers: {'Content-Type': 'application/json',},
  url: "/api/Employee",
  data: values,
} )
.then((r:any) => {
message.success("ValueLoadedSuccessfully");
}).catch((error:any) => {
  message.error(error.message);
});
}

const Forms=()=>{
    return(
<div className='main'>

    <Form
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 10 }}
    style={{ maxWidth: 1400 }}
    onFinish={postData}
    >
      <h1><u>Employee Form</u></h1>

      <Form.Item label="Empid" name="id">
          <Input />
      </Form.Item>

      <Form.Item label="Empname" name="empname" rules={[{ required: true, message: 'Please input your Employee Name!' }]}>
          <Input />
      </Form.Item>

      <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your Address!' }]}>
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Phoneno" name="phoneno" rules={[{ required: true, message: 'Please input your Phone Number!' }]}>
          <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input />
      </Form.Item>
      
      <Button type="primary" htmlType="submit" className='btn'>
          Submit
      </Button>

    </Form>
</div>
    )
}

export default Forms;