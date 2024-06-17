import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import PRForm from "./Main";
import URForm from "./update";
import { pid } from "process";
import moment from "moment";

const Forms = () => {
  //For Table
  const [tableData, setData] = useState<Array<any>>([]);
  //For Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //For Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  //For Checkbox
  const [checkAll, setCheckAll] = useState(false);
  //For Filter,Search
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState("");
  //For Dropdown
  const [selectedOption, setSelectedOption] = useState("true"); //Here if you give true means the value will be default as Active
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

  useEffect(() => {
    getData(selectedOption);
  }, []);

  const data = searchText ? filterData : tableData;

  //For Get
  const getData = (selectValue: any) => {
    let defUrl = "/api/PassportRegistration";
    if (selectValue === "true" || selectValue === "false") {
      defUrl = `/api/PassportRegistration?activeStatus=${selectValue}`;
    } else {
      defUrl = defUrl;
    }

    axios({
      method: "get",
      headers: { "Content-Type": "application/json" },
      url: defUrl,
    })
      .then((r: any) => {
        console.log(r.data);
        setData(r.data);
        setFilterData(r.data);
        message.success("Value loaded sucessfully");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };

  //For Search
  const filter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const searchText = event.currentTarget.value.toLowerCase();
    setSearchText(searchText);
    const result: any = tableData.filter((element: any) => {
      return element?.name?.toLowerCase().includes(searchText);
    });
    setFilterData(result);
  };

  //For Delete
  const deleteRecord = (pid: any) => {
    axios
      .delete(`/api/PassportRegistration?PId=${pid}`)
      .then((r: any) => {
        setData(tableData.filter((e) => e.pid !== pid));
        //getData();
        message.success("Record deleted successfully");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };

  //For Checkbox
  const handleCheckboxChange = (checked: boolean, record: any) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => record.pid === item.pid);
    newData[index].checked = checked;
    setData(newData);
  };

  const handleCheckAll = (e: any) => {
    const checked = e.target.checked;
    const newData = tableData.map((item: any) => ({ ...item, checked }));
    setData(newData);
    setCheckAll(checked);
  };

  const handleActivateDeactivate = (isActive: boolean) => {
    const selectedRows = tableData.filter((row) => row.checked);
    selectedRows.forEach((row) => {
      row.isActive = isActive;
      axios
        .put("/api/PassportRegistration", row)
        .then((response) => {
          console.log(response);
          message.success("Data added successfully");
        })
        .catch((error) => {
          console.log(error);
          message.error(error.message);
        });
    });
    setData([...tableData]);
  };

  function handleOptionChange(value: any) {
    console.log(value);
    setSelectedOption(value);
    getData(value);
  }

  //Table
  const columns: any = [
    {
      title: () => <Checkbox checked={checkAll} onChange={handleCheckAll} />,
      dataIndex: "checkBox",
      key: "checkBox",
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.checked}
          onChange={(e) => handleCheckboxChange(e.target.checked, record)}
        />
      ),
    },
    //To display serial number
    {
      title: "SerialNo",
      dataIndex: "S.No",
      key: "S.No",
      render: (value: any, item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      title: "Pid",
      dataIndex: "pid",
      key: "pid",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phoneno",
      dataIndex: "phoneno",
      key: "phoneno",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: any) => moment(date).format("DD-MM-YYYY"),
      //npm i moment
    },
    {
      title: "IsActive",
      key: "isActive",
      render: (record: any) => (record.isActive ? "Active" : "Inactive"),
    },
    {
      title: "",
      key: "actions",
      render: (text: any, record: any) => {
        return (
          <div hidden={!record.checked}>
            <Button type="primary" ghost onClick={showModal}>
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteRecord(record.pid)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1>
        <u>
          <p>Passport User Details</p>
        </u>
      </h1>

      <PRForm />

      <input
        style={{ marginRight: "1%" }}
        type="text"
        onKeyUp={filter}
        placeholder="Enter the name to search"
      />

      {/* This modal without ok button */}
      <Modal
        title="Update Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        {" "}
        <URForm />
      </Modal>

      <label style={{ marginLeft: "35%" }}>Active Status: </label>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        style={{ width: "100px" }}
      >
        <Select.Option value={undefined}>--</Select.Option>
        <Select.Option value="true">Active</Select.Option>
        <Select.Option value="false">Inactive</Select.Option>
      </Select>
      <Button
        id="activateButton"
        type="primary"
        onClick={() => handleActivateDeactivate(true)}
      >
        Activate
      </Button>
      <Button
        id="deactivateButton"
        type="primary"
        danger
        onClick={() => handleActivateDeactivate(false)}
      >
        Deactivate
      </Button>

      <Table
        columns={columns}
        dataSource={filterData}
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
    </div>
  );
};

export default Forms;
