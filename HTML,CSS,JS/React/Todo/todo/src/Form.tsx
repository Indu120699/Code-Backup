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

const PForm: React.FC = () => {
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
      url: "https://localhost:7191/api/Todo",
      data: values,
    })
      .then((r: any) => {
        message.success("Your record have been added successfully");
      })
      .catch((error: any) => {
        message.error(error.response.data);
      });
    //To auto refresh
    window.location.reload();
  };

  return (
    <div className="add">
      <Button
        id="idp"
        type="primary"
        onClick={showModal}
        style={{ left: "40%", top: "28px" }}
      >
        Add
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
            <u>TODO</u>
          </h1>

          {/* <Form.Item
            label="Tid"
            name="tid"
            rules={[{ required: true, message: "Please input your Tid!" }]}
          >
            <Input />
          </Form.Item> */}

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

          <Form.Item label="Select">
            <Select>
              <Select.Option value="Pending">Pending</Select.Option>
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
};

export default PForm;
