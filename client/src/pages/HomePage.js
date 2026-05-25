import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import SummaryCards from "../components/Dashboard/SummaryCards";
import TransactionList from "../components/Dashboard/TransactionList";
import API from "../utils/axiosConfig";
import { message, Spin } from "antd";

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [transRes, sumRes] = await Promise.all([
        API.get("/transactions"),
        API.get("/transactions/summary")
      ]);
      setTransactions(transRes.data.data);
      setSummary(sumRes.data.data);
    } catch (error) {
      message.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <Layout>
      <div className="home-page" style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <SummaryCards summary={summary} />
            <TransactionList transactions={transactions} onRefresh={fetchDashboardData} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
