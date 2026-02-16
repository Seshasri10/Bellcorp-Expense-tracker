const FilterPanel = ({ category, setCategory }) => {
  return (
    <div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
      </select>
    </div>
  );
};

export default FilterPanel;
