import React, { useEffect } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolio } from "../api/portfolio.api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Portfolio = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  const handleEdit = (record) => {
    message.info(`Editing: ${record.title}`);
    // You can open a modal or navigate to an edit page here
  };

  const handleDelete = (id) => {
    message.success(`Deleted item with ID: ${id}`);
    // You can dispatch a delete action here
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Company Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => handleEdit(record)}
          >
           <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            
            <Button type="danger" size="small"   style={{ backgroundColor: "red", color: "white", border: "none" }}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = userInfo
    ? userInfo.map((item, index) => ({
        ...item,
        key: index,
      }))
    : [];

  return (
    <div className="w-full h-full p-6 bg-white text-black rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Portfolio Overview</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Portfolio;
