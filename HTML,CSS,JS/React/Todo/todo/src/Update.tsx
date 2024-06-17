import React, { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import axios from "axios";

//For Update
const UForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const onFinish = (values: any) => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/Todo",
      data: values,
    })
      .then((response) => {
        message.success("Your record have been updated successfully");
      })
      .catch((error) => {
        message.error(error.message);
      });
    //To auto refresh
    window.location.reload();
  };

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

  return (
    <div className="main">
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
          <u>TODO</u>
        </h1>

        <Form.Item
          label="Tid"
          name="tid"
          rules={[{ required: true, message: "Please input your Tid!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="Description"
          rules={[
            { required: true, message: "Please input your Description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="duedate"
          label="Date"
          rules={[{ required: true, message: "Please provide Date!" }]}
          hasFeedback
        >
          <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UForm;
