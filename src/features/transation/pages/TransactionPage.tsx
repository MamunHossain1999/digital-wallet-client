// src/pages/TransactionPage.tsx


import { useGetMyTransactionsQuery } from "../transactionApi/transactionApi";


const TransactionPage = () => {
  const {  data: transactions,isLoading, isError } = useGetMyTransactionsQuery();
  console.log(transactions)

  if (isLoading) return <p>Loading transactions...</p>;
  if (isError) return <p>Failed to load transactions</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Transactions</h2>
      <ul className="space-y-2">
        {transactions?.map((trx) => (
          <li key={trx._id} className="border p-2 rounded">
            <p>Type: {trx.type}</p>
            <p>Amount: {trx.amount}</p>
            <p>Status: {trx.status}</p>
            <p>Date: {new Date(trx.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionPage;
