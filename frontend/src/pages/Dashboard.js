import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import SummaryCard from "../components/dashboard/SummaryCard";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";
import RecentTransactions from "../components/dashboard/RecentTransactions";

const Dashboard = () => {
  const { transactions } = useContext(TransactionContext);

  const total = transactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <SummaryCard total={total} />
      <CategoryBreakdown transactions={transactions} />
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default Dashboard;
