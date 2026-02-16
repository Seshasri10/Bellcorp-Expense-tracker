import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const TransactionItem = ({ transaction }) => {
  const {
    deleteTransaction,
    setEditingTransaction,
  } = useContext(TransactionContext);

  return (
    <li>
      {transaction.title} - ₹ {transaction.amount}

      <button onClick={() => setEditingTransaction(transaction)}>
        Edit
      </button>

      <button onClick={() => deleteTransaction(transaction._id)}>
        Delete
      </button>
    </li>
  );
};

export default TransactionItem;
