const Transaction = require("../models/Transaction");
const { incomeCategories, expenseCategories } = require("../config/categories");

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

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    if (transaction.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    await transaction.deleteOne();
    res.json({ success: true, message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction };

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    if (transaction.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction, updateTransaction };

const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    res.json({ success: true, data: { income, expense, balance: income - expense, total: transactions.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction, updateTransaction, getSummary };
