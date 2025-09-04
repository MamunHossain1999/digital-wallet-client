/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useGetMyTransactionsQuery } from "../transactionApi/transactionApi";

const TransactionHistory: React.FC = () => {
  const { data: transactions, isLoading, error } = useGetMyTransactionsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as any).data?.message}</p>;

  return (
    <div>
      <h2>My Transactions</h2>
      <ul>
        {transactions?.map((trx) => (
          <li key={trx._id}>
            {trx.type} - {trx.amount} - {trx.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
