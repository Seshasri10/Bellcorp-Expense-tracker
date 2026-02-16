import { createContext, useState, useEffect } from "react";

export const TransactionContext = createContext();

const BASE_URL = "http://localhost:5000/api";

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchTransactions = async (newPage = 1) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${BASE_URL}/transactions?page=${newPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      setTransactions((prev) =>
        newPage === 1
          ? data.transactions
          : [...prev, ...data.transactions]
      );

      setPage(data.page);
      setPages(data.pages);
    }
  };

  const addTransaction = async (transaction) => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    });

    fetchTransactions(1);
  };

  const updateTransaction = async (id, updatedData) => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    fetchTransactions(1);
    setEditingTransaction(null);
  };

  const deleteTransaction = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTransactions(1);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        editingTransaction,
        setEditingTransaction,
        page,
        pages,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
