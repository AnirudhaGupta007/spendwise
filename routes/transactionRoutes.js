const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getTransactions, addTransaction, deleteTransaction, updateTransaction, getSummary } = require("../controllers/transactionController");

router.get("/", auth, getTransactions);
router.get("/summary", auth, getSummary);
router.post("/", auth, addTransaction);
router.delete("/:id", auth, deleteTransaction);
router.put("/:id", auth, updateTransaction);

module.exports = router;
