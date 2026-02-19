import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button, InputNumber, message } from "antd";
import Layout from "../components/Layout/Layout";
import API from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

const { Option } = Select;

const AddTransaction = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await API.post("/transactions", {
        ...values,
        date: values.date?.toISOString(),
      });
      message.success("Transaction added");
      navigate("/");
    } catch (error) {
      message.error("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="form-page">
        <h2>Add Transaction</h2>
        <Form layout="vertical" onFinish={onFinish} className="transaction-form">
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} size="large" prefix="₹" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select size="large">
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select size="large">
              <Option value="salary">Salary</Option>
              <Option value="food">Food</Option>
              <Option value="rent">Rent</Option>
              <Option value="transport">Transport</Option>
              <Option value="shopping">Shopping</Option>
              <Option value="bills">Bills</Option>
              <Option value="entertainment">Entertainment</Option>
              <Option value="health">Health</Option>
              <Option value="education">Education</Option>
              <Option value="freelance">Freelance</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <DatePicker style={{ width: "100%" }} size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block size="large">Add Transaction</Button>
        </Form>
      </div>
    </Layout>
  );
};

export default AddTransaction;
