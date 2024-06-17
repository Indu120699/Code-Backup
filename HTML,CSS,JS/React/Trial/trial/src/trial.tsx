import React, { useEffect, useState } from "react";
import {
  Button,
  
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  SelectProps,
  Space,
  Table,
 
} from "antd";

import axios from "axios";
import { EditTwoTone, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import momentjs from "moment";





export const Employee: React.FC = () => {
  const [tableData, setData] = useState<Array<any>>([]);
  const [tableDatas, setDatas] = useState<Array<any>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpens, setIsModalOpens] = useState(false);
  const [isTableModal, setIsTableModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedOption, setSelectedOption] = useState(true);
  const [searchText, setSearchText] = useState("");
  const options: SelectProps["options"] = [];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState<{ isActive: boolean }[]>([]);


  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModals = () => {
    setIsModalOpens(true);
  };
  const showTableModal = () => {
    setIsTableModal(true);
    console.log(selectedRowKeys)
    getData(selectedRowKeys);
  };
 
  const [form] = Form.useForm();

  const Tdata = (select: any) => {
    let urlT = "/api/Admin/GetEmployeeIsActive";
    if (select === true || select === false) {
      urlT = `/api/Admin/GetEmployeeIsActive?isActive=${select}`;
    } else {
      urlT = "/api/Admin/GetEmployeeIsActive";
    }
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: urlT,
    })
      .then((r: any) => {
        setData(r.data);
        message.success("Value Loaded");
      })
      .catch((error: any) => {
        message.error(error.message);
        console.log(selectedOption);
      });
  };



const onupdate = (values: any) => {
  axios({
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    url: "/api/Admin/EditEmployee",
    data: values,
  })
    .then((response) => {
      message.success("Your record have been updated successfully");
    })
    .catch((error) => {
      message.error(error.message);
    });
 
};


function handleOptionChange(value: any) {
    setSelectedOption(value);
    Tdata(value);
  }

  useEffect(() => {
    Tdata(selectedOption);
  }, []);

  const onFinish = (values: any) => {
    console.log(values);
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "/api/Admin/AddEmployee",
      data: values,
    })
      .then((r: any) => {
        message.success("Your record have been added successfully");
      })
      .catch((error: any) => {
        message.error(error.response.data);
      });
   
  };




  const filteredData = tableData.filter((record: any) => {
    const values = Object.values(record).join(" ").toLowerCase();

    return values.includes(searchText.toLowerCase());
  });



  const handleActivateDeactivate = (isActive: boolean) => {
    const val = {
      id: selectedRowKeys,
     
    };
    console.log(val); 
    if (selectedRowKeys == null) {
      message.error("No selected row");
      return;
    }
    const hasCompletedRows =
      tableData.filter((row: any) => row.is_Active === false).length > 0;
    const active = !hasCompletedRows;
    if (isActive === false && !active) {
      message.error("Cannot deactivate inactive user");
      return;
    }
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      url: `/api/Admin/EditEmployeIsActive?Is_Active=${isActive}`,
      data: val,
    })
      .then((response) => {
        message.success("Record's status updated");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedRows(selectedRows);
     },
  };


 const showModals1 = (record: {
   employee_Id: any;
   full_Name: any;
   employee_Type: any;
   designation: any;
   reporting_Manager1: any;
   reportinng_Manager2: any;
   joining_Date: any;
   end_Date: any;
   email: any;
   contact_No: any;
 }) => {
   form.setFieldsValue({
     employee_Id: record.employee_Id,
     full_Name: record.full_Name,
     employee_Type: record.employee_Type,
     designation: record.designation,
     reporting_Manager1: record.reporting_Manager1,
     reportinng_Manager2: record.reportinng_Manager2,
     joining_Date: momentjs(record.joining_Date),
     end_Date: momentjs(record.end_Date),
     email: record.email,
     contact_No: record.contact_No,
   });
 };

const columns: any = [
    {
      title: "SerialNo",
      dataIndex: "S.No",
      key: "S.No",
      render: (_value: any, _item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      title: "Employee ID",
      dataIndex: "employee_Id",
      key: "employee_Id",
    },
    {
      title: "Employee Name",
      dataIndex: "full_Name",
      key: "full_Name",
    },
    {
      title: "Type",
      dataIndex: "employee_Type",
      key: "employee_Type",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Reporting Manager1",
      dataIndex: "reporting_Manager1",
      key: "reporting_Manager1",
    },
    {
      title: "Reporting Manager2",
      dataIndex: "reportinng_Manager2",
      key: "reportinng_Manager2",
    },
    {
      title: "Joining Date",
      dataIndex: "joining_Date",
      key: "joining_Date",
      render: (text: any, record: any, index: number) => (
        <Input
          type="date"
          value={record.joining_Date.toString().slice(0, 10)}
        />
      ),
    },
    {
      title: "End Date",
      dataIndex: "end_Date",
      key: "end_Date",
      render: (text: any, record: any, index: number) => (
        <Input 
        type="date" 
        value={record.end_Date.toString().slice(0, 10)} 
        />
      ),
    },
    {
      title: "Mail Id",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contact_No",
      key: "contact_No",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => {
        return (
          <div
            style={{
              visibility:
                selectedRowKeys.length === 1 &&
                record.employee_Id === selectedRowKeys[0]
                  ? "visible"
                  : "hidden",
              display: "flex",
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                showModals();
                showModals1(record);
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];
      const getData = (val: any) => {
        axios({
          method: "get",
          headers: { "Content-Type": "application/json" },
          url: `/api/Admin/GetViewPreviousChangesById?Id=${val}`,
        })
          .then((r: any) => {
            console.log(r.data);
            setDatas(r.data);
            message.success("ValueLoaded");
          })
          .catch((error: any) => {
            message.error(error.message);
          });
      };

      
      const columns1: any = [
        {
          title: "Employee ID",
          dataIndex: "employee_Id",
          key: "employee_Id",
        },
        {
          title: "Employee Name",
          dataIndex: "full_Name",
          key: "full_Name",
        },
        {
          title: "Employee Type",
          dataIndex: "employee_Type",
          key: "employee_Type",
        },
        {
          title: "Joining Date",
          dataIndex: "joining_Date",
          key: "joining_Date",
        },
      
        {
          title: "Designation",
          dataIndex: "designation",
          key: "designation",
        },
        {
          title: "Reporting Manager1",
          dataIndex: "reporting_Manager",
          key: "reporting_Manager",
        },
        {
          title: "Mail Id",
          dataIndex: "emailId",
          key: "emailId",
        },
        {
          title: "Contact No",
          dataIndex: "contact_No",
          key: "contact_No",
        },
      ];

  return (
    <div>
      <h1>Employees</h1>

      <Input
        value={searchText}
        onChange={(e: any) => setSearchText(e.target.value)}
        placeholder="Search"
        style={{
          width: 100,
          textAlign: "center",
          color: "black",
          display: "flex",
          float: "right",
        }}
        suffix={
          <Space>
            <SearchOutlined style={{ color: "#1890ff" }} />{" "}
          </Space>
        }
      />
      <div
        style={{
          display: "flex",
          float: "right",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <div
          hidden={
            selectedRows.filter((row: any) => row.is_Active == false).length ===
            0
          }
        >
          {" "}
          <Button
            onClick={() => handleActivateDeactivate(true)}
            type="primary"
            style={{
              width: 85,
              backgroundColor: "rgb(0, 179, 0)",
              fontWeight: 500,
              marginRight: 4,
            }}
          >
            Activate{" "}
          </Button>{" "}
        </div>{" "}
        <div
          hidden={
            selectedRows.filter((row: any) => row.is_Active == true).length ===
            0
          }
        >
          {" "}
          <Button
            type="primary"
            danger
            style={{ width: 100, fontWeight: 500, marginRight: 4 }}
            onClick={() => handleActivateDeactivate(false)}
          >
            Deactivate{" "}
          </Button>{" "}
        </div>{" "}
      </div>

      <label style={{ marginLeft: "10%" }}>Active: </label>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        style={{ width: "100px", top: "-5px" }}
      >
        <Select.Option value={false}>No</Select.Option>
        <Select.Option value={true}>Yes</Select.Option>
      </Select>

      <Button
        id="idp"
        type="primary"
        onClick={showModal}
        style={{ left: "10%" }}
      >
        Add Employee
      </Button>
     

      <Table
        dataSource={filteredData}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record: any) => record.employee_Id}
        pagination={{
          current: page,
          pageSize,
          total: tableData.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (current, pageSize) => {
            setPage(current);
            setPageSize(pageSize || 10);
          },
        }}
      />

      <Modal
        title="Add Employee"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
        ]}
        style={{ width: 100 }}
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
          <Form.Item
            label="Employee Id"
            name="Employee Id"
            rules={[
              { required: false, message: "Please input your Employee Id!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="first_Name"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_Name"
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee Code"
            name="employee_code"
            rules={[
              { required: true, message: "Please input your Employee Code!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Reporting Manager1"
            name="reporting_Manager1"
            rules={[
              {
                required: true,
                message: "Please input your Reporting Manager1!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Manuj Kumar B">Manuj Kumar B</Select.Option>
              <Select.Option value="Appusamy S">Appusamy S</Select.Option>
              <Select.Option value="Rabik S">Rabik S</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Reporting Manager2"
            name="reportinng_Manager2"
            rules={[
              {
                required: true,
                message: "Please input your Reporting Manager2!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Sweta P">Sweta P</Select.Option>
              <Select.Option value="Sadiq S">Sadiq S</Select.Option>
              <Select.Option value="Anjana G">Anjana G</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Employee Type Id"
            name="employee_Type_Id"
            rules={[
              {
                required: true,
                message: "Please input your Employee Type Id!",
              },
            ]}
          >
            <Select>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Role Id"
            name="role_id"
            rules={[{ required: true, message: "Please input your Role Id!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Designation Id"
            name="designation_Id"
            rules={[
              { required: true, message: "Please input your Designation Id!" },
            ]}
          >
            <Select>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Joining Date"
            label="joining_Date"
            rules={[
              { required: true, message: "Please provide Joining Date!" },
            ]}
            hasFeedback
          >
            <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="End Date"
            label="end_Date"
            rules={[{ required: true, message: "Please provide End Date!" }]}
            hasFeedback
          >
            <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
          </Form.Item>
          <h1>Contact Info</h1>
          <Form.Item
            label="Mail"
            name="official_Email"
            rules={[{ required: true, message: "Please input your Mail!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Alternate Mail"
            name="alternate_Email"
            rules={[
              {
                required: false,
                message: "Please input your Alternate  Mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact No"
            name="contact_No"
            rules={[
              { required: true, message: "Please input your Contact No!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Employee"
        open={isModalOpens}
        onCancel={() => setIsModalOpens(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpens(false)}>
            Cancel
          </Button>,
        ]}
        style={{ width: 100 }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onupdate}
          form={form}
        >
          <Form.Item
            label="Employee Id"
            name="employee_Id"
            rules={[
              { required: false, message: "Please input your Employee Id!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="first_Name"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_Name"
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee Code"
            name="employee_code"
            rules={[
              { required: true, message: "Please input your Employee Code!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Reporting Manager1"
            name="reporting_Manager1"
            rules={[
              {
                required: true,
                message: "Please input your Reporting Manager1!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Manuj Kumar B">Manuj Kumar B</Select.Option>
              <Select.Option value="Appusamy S">Appusamy S</Select.Option>
              <Select.Option value="Rabik S">Rabik S</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Reporting Manager2"
            name="reportinng_Manager2"
            rules={[
              {
                required: true,
                message: "Please input your Reporting Manager2!",
              },
            ]}
          >
            <Select>
              <Select.Option value="Sweta P">Sweta P</Select.Option>
              <Select.Option value="Sadiq S">Sadiq S</Select.Option>
              <Select.Option value="Anjana G">Anjana G</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Employee Type Id"
            name="employee_Type_Id"
            rules={[
              {
                required: true,
                message: "Please input your Employee Type Id!",
              },
            ]}
          >
            <Select>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Role Id"
            name="role_id"
            rules={[{ required: true, message: "Please input your Role Id!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Designation Id"
            name="designation_Id"
            rules={[
              { required: true, message: "Please input your Designation Id!" },
            ]}
          >
            <Select>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Joining Date"
            label="joining_Date"
            rules={[
              { required: true, message: "Please provide Joining Date!" },
            ]}
            hasFeedback
          >
            <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="End Date"
            label="end_Date"
            rules={[{ required: true, message: "Please provide End Date!" }]}
            hasFeedback
          >
            <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
          </Form.Item>
          <h1>Contact Info</h1>
          <Form.Item
            label="Mail"
            name="official_Email"
            rules={[{ required: true, message: "Please input your Mail!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Alternate Mail"
            name="alternate_Email"
            rules={[
              {
                required: false,
                message: "Please input your Alternate  Mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact No"
            name="contact_No"
            rules={[
              { required: true, message: "Please input your Contact No!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>

          <Button type="link" block onClick={showTableModal}>
            View Previous Changes
          </Button>
        </Form>
      </Modal>
      <Modal
        open={isTableModal}
        onCancel={() => setIsTableModal(false)}
        footer={null}
        width={1000}
        centered
      >
        <Table dataSource={tableDatas} columns={columns1} />
      </Modal>
    </div>
  );
};

