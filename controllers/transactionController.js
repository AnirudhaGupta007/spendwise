const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTransactions };

const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;
    if (!amount || !type || !category) {
      return res.status(400).json({ success: false, message: "Amount, type and category required" });
    }
    const transaction = await Transaction.create({
      userId: req.userId, amount, type, category, description, date,
    });
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTransactions, addTransaction };
