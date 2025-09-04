import React from "react";
import type { Transaction } from "../types";
import { useGetMyTransactionsQuery } from "../transactionApi/transactionApi";


const TransactionList: React.FC = () => {
  const { data, error, isLoading } = useGetMyTransactionsQuery();

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error fetching transactions</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Transactions</h2>
      {data && data.length ? (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">From</th>
              <th className="border px-2 py-1">To</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((trx: Transaction) => (
              <tr key={trx._id}>
                <td className="border px-2 py-1">{trx.type}</td>
                <td className="border px-2 py-1">{trx.amount}</td>
                {/* <td className="border px-2 py-1">{trx.from?.email || "N/A"}</td>
                <td className="border px-2 py-1">{trx.to?.email || "N/A"}</td> */}
                <td className="border px-2 py-1">
                  {new Date(trx.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
