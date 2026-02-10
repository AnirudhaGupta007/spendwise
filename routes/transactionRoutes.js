const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getTransactions, addTransaction, deleteTransaction, updateTransaction } = require("../controllers/transactionController");

router.get("/", auth, getTransactions);
router.post("/", auth, addTransaction);
router.delete("/:id", auth, deleteTransaction);
router.put("/:id", auth, updateTransaction);

module.exports = router;
