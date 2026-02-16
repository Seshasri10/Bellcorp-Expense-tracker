import { useState, useContext, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const TransactionForm = () => {
  const {
    addTransaction,
    updateTransaction,
    editingTransaction,
  } = useContext(TransactionContext);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTransaction) {
      updateTransaction(editingTransaction._id, formData);
    } else {
      addTransaction(formData);
    }

    setFormData({
      title: "",
      amount: "",
      category: "Food",
      date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
      </select>

      <button type="submit">
        {editingTransaction ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TransactionForm;
