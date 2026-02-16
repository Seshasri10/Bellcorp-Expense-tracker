const RecentTransactions = ({ transactions }) => {
  // Show only latest 5 transactions
  const recent = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      <h3>Recent Transactions</h3>

      {recent.length === 0 ? (
        <p>No recent transactions.</p>
      ) : (
        <ul>
          {recent.map((t) => (
            <li key={t._id}>
              {t.title} - ₹ {t.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
