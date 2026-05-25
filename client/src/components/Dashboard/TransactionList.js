import React from "react";
import { Table, Button, Tag, Space, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import API from "../../utils/axiosConfig";

const TransactionList = ({ transactions, onRefresh }) => {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      message.success("Transaction deleted successfully");
      onRefresh();
    } catch (error) {
      message.error("Failed to delete transaction");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "income" ? "green" : "red"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <span style={{ color: record.type === "income" ? "#3f8600" : "#cf1322" }}>
          ₹{amount}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="transactionlist">
      <Table 
        columns={columns} 
        dataSource={transactions} 
        rowKey="_id" 
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TransactionList;
