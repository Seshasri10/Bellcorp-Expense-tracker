import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import SearchBar from "../components/explorer/SearchBar";
import FilterPanel from "../components/explorer/FilterPanel";
import TransactionList from "../components/explorer/TransactionList";
import TransactionForm from "../components/explorer/TransactionForm";

const Explorer = () => {
  const {
    transactions,
    fetchTransactions,
    page,
    pages,
  } = useContext(TransactionContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || t.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>Transaction Explorer</h1>

      <TransactionForm />

      <SearchBar search={search} setSearch={setSearch} />
      <FilterPanel category={category} setCategory={setCategory} />

      <TransactionList transactions={filteredTransactions} />

      {page < pages && (
        <button onClick={() => fetchTransactions(page + 1)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Explorer;
