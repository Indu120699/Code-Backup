import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import moment from "moment";
import PForm from "./Form";
import UForm from "./Update";
import { UndoOutlined } from "@ant-design/icons";

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
  const [selectedOption, setSelectedOption] = useState("false");
  //   const { Option } = Select;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   getData(selectedOption);
  // }, []);

  //const data = searchText ? filterData : tableData;

  //For Get
  const getData = (selectValue: any) => {
    let defUrl = "/api/Todo";
    if (selectValue === "true" || selectValue === "false") {
      defUrl = `/api/Todo?activeStatus=${selectValue}`;
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
      return (
        element?.title?.toLowerCase().includes(searchText) ||
        element?.description?.toLowerCase().includes(searchText) ||
        element?.duedate?.toString().slice(0, 10).includes(searchText) ||
        element?.tid?.toString().includes(searchText)
      );
    });
    setFilterData(result);
  };

  //For Delete
  const deleteRecord = (tid: any) => {
    axios
      .delete(`/api/Todo?TId=${tid}`)
      .then((response) => {
        setData(tableData.filter((e) => e.tid !== tid));
        //getData();
        message.success("Record deleted successfully");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
    window.location.reload();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedRows(selectedRows);
      console.log(selectedKeys, selectedRows);
      //To update the checked property of the selected rows
      const updatedTableData = tableData.map((row) =>
        selectedRows.includes(row) ? { ...row, checked: true } : row
      );
      setData(updatedTableData);
    },
  };

  const isRowSelectedAndStatus = () => {
    const selectedRows = tableData.filter((row) => row.checked);
    if (selectedRows.length === 0) {
      return false;
    }
    if (selectedRows.some((row) => row.status)) {
      return true; // At least one selected row is active
    }
    return false; // All selected rows are inactive
  };

  //For Update
  const PendingandCompleted = (status: boolean) => {
    const selectedRecord = tableData.filter((row) => row.checked);
    if (selectedRecord.length === 0) {
      message.warning("Please select at least one row");
      return;
    }
    Promise.all(
      selectedRecord.map((row) =>
        axios.put(`/api/Todo`, {
          ...row,
          status: status,
        })
      )
    )
      .then((response) => {
        console.log(response);
        message.success("Mark Completed is Updated");
        window.location.reload();
        setData([...tableData]);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  function handleOptionChange(value: any) {
    console.log(value);
    setSelectedOption(value);
    getData(value);
  }

  //Table
  const columns: any = [
    //To display serial number
    {
      title: "SerialNo",
      dataIndex: "S.No",
      key: "S.No",
      render: (value: any, item: any, index: any) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      title: "Tid",
      dataIndex: "tid",
      key: "tid",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "duedate",
      key: "duedate",
      render: (date: any) => moment(date).format("DD-MM-YYYY"),
      //npm i moment
    },
    {
      title: "Status",
      key: "status",
      render: (record: any) => (record.status ? "completed" : "pending"),
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
                record.tid === selectedRowKeys[0]
                  ? "visible"
                  : "hidden",
              display: "flex",
            }}
          >
            <Button type="primary" onClick={showModal}>
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteRecord(record.tid)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
    {
      title: "Undo",
      key: "undo",
      render: (record: any) => (
        <div hidden={selectedRowKeys.length === 0}>
          <Button
            style={{ marginRight: "10px" }}
            id="activateButton"
            type="primary"
            disabled={!isRowSelectedAndStatus()}
            onClick={() => PendingandCompleted(false)}
            icon={<UndoOutlined />}
          >
            
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PForm />

      <Input
        style={{ marginRight: "1%", width: 200, marginBottom: 8 }}
        type="text"
        onKeyUp={filter}
        placeholder="Enter any value to search"
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
        <UForm />
      </Modal>

      <label style={{ marginLeft: "35%" }}>Active Status: </label>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        style={{ width: "100px", top: "-5px" }}
      >
        <Select.Option value={undefined}>--</Select.Option>
        <Select.Option value="true">Completed</Select.Option>
        <Select.Option value="false">Pending</Select.Option>
      </Select>

      <div className="mark" hidden={selectedRowKeys.length === 0}>
        <Button
          style={{ marginRight: "10px" }}
          id="deactivateButton"
          type="primary"
          danger
          disabled={isRowSelectedAndStatus()}
          onClick={() => PendingandCompleted(true)}
        >
          Mark Completed
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filterData}
        rowSelection={rowSelection}
        rowKey={(record: any) => record.tid}
        style={{ backgroundColor: "#f0f0f0", padding: "20px" }}
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
