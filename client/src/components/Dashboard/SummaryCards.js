import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, WalletOutlined } from "@ant-design/icons";

const SummaryCards = ({ summary }) => {
  return (
    <div className="summarycards" style={{ marginBottom: "20px" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false} className="summary-card">
            <Statistic
              title="Total Income"
              value={summary?.income || 0}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="₹"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="summary-card">
            <Statistic
              title="Total Expense"
              value={summary?.expense || 0}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="₹"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="summary-card">
            <Statistic
              title="Current Balance"
              value={summary?.balance || 0}
              precision={2}
              valueStyle={{ color: "#1890ff" }}
              prefix={<WalletOutlined />}
              suffix="₹"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryCards;
