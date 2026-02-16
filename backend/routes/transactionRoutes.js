const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


//Add Transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;

    const transaction = new Transaction({
      title,
      amount,
      category,
      date,
      notes,
      user: req.user.id
    });

    await transaction.save();
    res.status(201).json(transaction);

  } catch (error) {
    console.log("ADD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//Get User Transactions
// 📥 Get Transactions (Pagination + Search + Filters)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const minAmount = req.query.minAmount;
    const maxAmount = req.query.maxAmount;

    const skip = (page - 1) * limit;

    // Build dynamic filter object
    let filter = {
      user: req.user.id
    };

    // Search by title
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Date range filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Amount range filter
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = Number(minAmount);
      if (maxAmount) filter.amount.$lte = Number(maxAmount);
    }

    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments(filter);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      transactions
    });

  } catch (error) {
    console.log("FETCH ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//Update Transaction
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    Object.assign(transaction, req.body);
    await transaction.save();

    res.json(transaction);

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//Delete Transaction
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Dashboard Summary
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const totalExpense = transactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const categoryBreakdown = {};

    transactions.forEach((t) => {
      if (!categoryBreakdown[t.category]) {
        categoryBreakdown[t.category] = 0;
      }
      categoryBreakdown[t.category] += t.amount;
    });

    res.json({
      totalExpense,
      categoryBreakdown
    });

  } catch (error) {
    console.log("SUMMARY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
