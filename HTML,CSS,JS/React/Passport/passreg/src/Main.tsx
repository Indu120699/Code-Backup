import React, { useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, message, Modal, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const PRForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //For Modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //For Add
  const onFinish = (values: any) => {
    console.log(values);
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "/api/PassportRegistration",
      data: values,
    })
      .then((r: any) => {
        message.success(
          "Your record have been added successfully"
        );
      })
      .catch((error: any) => {
        message.error(error.response.data);//If i give "error.response.data" means all the web api validations will come here also
      });
    //To auto refresh
    window.location.reload();
  }

return (
  <div>
    <Button id="idp" type="primary" onClick={showModal} style={{ left: "40%" }}>
      Add User
    </Button>

    <Modal
      title="Add Details"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <h1>
          <u>Passport Registration Form</u>
        </h1>

        <Form.Item
          label="Pid"
          name="pid"
          rules={[{ required: true, message: "Please input your Pid!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phoneno"
          name="phoneno"
          rules={[{ required: true, message: "Please input your Phoneno!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please provide Date!" }]}
          hasFeedback
        >
          <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Select">
          <Select>
            <Select.Option value="Active">Active</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
);
}

export default PRForm;