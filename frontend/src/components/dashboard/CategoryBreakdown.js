const CategoryBreakdown = ({ transactions }) => {
  const grouped = {};

  transactions.forEach((t) => {
    grouped[t.category] =
      (grouped[t.category] || 0) + Number(t.amount);
  });

  return (
    <div>
      <h3>Category Breakdown</h3>
      <ul>
        {Object.entries(grouped).map(([cat, amt]) => (
          <li key={cat}>
            {cat}: ₹ {amt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBreakdown;
