import { Button, Table, Modal, Form, Input } from "antd";
import { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function Apps() {
  const [SearchedText, SetSearchedText] = useState("");
  //useState
  const [dataSource, setdataSource] = useState([
    {
      id: "1",
      name: "Indu",
      qualification: "MCA",
    },
    {
      id: "2",
      name: "Bindu",
      qualification: "MCA",
    },
    {
      id: "3",
      name: "Sindu",
      qualification: "MCA",
    },
  ]);
  //Table
  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
      filteredValue: [SearchedText],
      onFilter: (value: any, record: any) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.qualification)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      // filteredValue: [SearchedText],
      // onFilter: (value: any, record: any) => {
      //   return String(record.name).toLowerCase().includes(value.toLowerCase());
      // },
    },
    {
      key: "qualification",
      title: "Qualification",
      dataIndex: "qualification",
      filteredValue: [SearchedText],
      // onFilter: (value: any, record: any) => {
      //  return String(record.qualification)
      //    .toLowerCase()
      //    .includes(value.toLowerCase());
      // },
    },
    {
      key: "actions",
      title: "Actions",
      //render
      render: (record: any) => {
        return (
          <>
            <EditOutlined onClick={EditModal} />
            <DeleteOutlined style={{ color: "red", marginLeft: "20px" }} />
          </>
        );
      },
    },
  ];
  //AddModal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Fill the form");

  const AddModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //EditModal
  const [opens, setOpens] = useState(false);
  const [confirmLoadings, setConfirmLoadings] = useState(false);
  const [modalTexts, setModalTexts] = useState("Fill the form");

  const EditModal = () => {
    setOpens(true);
  };

  const handleOks = () => {
    setModalTexts("");
    setConfirmLoadings(true);
    setTimeout(() => {
      setOpens(false);
      setConfirmLoadings(false);
    }, 2000);
  };

  const handleCancels = () => {
    console.log("Clicked cancel button");
    setOpens(false);
  };

  const onFinishs = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFaileds = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //return
  return (
    <div>
      <Button onClick={AddModal}>Add New Student</Button>
      <Input.Search
        size="small"
        placeholder="Search here"
        // suffix={<SearchOutlined />}
        style={{ width: 200, marginLeft: 100 }}
        onSearch={(value: any) => {
          SetSearchedText(value);
        }}
      />
      <Table dataSource={dataSource} columns={columns} />
      {/* Add Modal */}
      <Modal
        title="Add New Student"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Id"
              name="id"
              rules={[{ required: true, message: "Please input your Id!" }]}
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
              label="Qualification"
              name="qualification"
              rules={[
                { required: true, message: "Please input your Qualification!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </p>
      </Modal>
      {/* Edit Modal */}
      <Modal
        title="Edit Student"
        open={opens}
        onOk={handleOks}
        confirmLoading={confirmLoadings}
        onCancel={handleCancels}
      >
        <p>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinishs}
            onFinishFailed={onFinishFaileds}
            autoComplete="off"
          >
            <Form.Item
              label="Id"
              name="id"
              rules={[{ required: true, message: "Please input your Id!" }]}
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
              label="Qualification"
              name="qualification"
              rules={[
                { required: true, message: "Please input your Qualification!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </p>
      </Modal>
    </div>
  );
}

export default Apps;
