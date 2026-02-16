import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p>No transactions found.</p>;
  }

  return (
    <ul>
      {transactions.map((t) => (
        <TransactionItem key={t._id} transaction={t} />
      ))}
    </ul>
  );
};

export default TransactionList;
