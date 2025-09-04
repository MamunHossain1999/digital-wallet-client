import React, { useState } from "react";
import { useGetAllTransactionsQuery, type Transaction } from "./allAdminApi/transactionAdminApi";

const label = (v: Transaction["from"]) => {
  if (!v) return "—";
  if (typeof v === "string") return v;
  return v.name ?? v._id;
};

const AdminTransactionsPage: React.FC = () => {
  const { data: txns = [], isLoading, isError } = useGetAllTransactionsQuery();

  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // প্রতি পেজে কতটি ট্রানজেকশন দেখাবো

  const totalPages = Math.ceil(txns.length / itemsPerPage);

  const paginatedTxns = txns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <p className="p-6">Loading transactions…</p>;
  if (isError) return <p className="p-6 text-red-600">Failed to load transactions</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">All Transactions</h1>

      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Type</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">From</th>
              <th className="p-3 border-b">To</th>
              <th className="p-3 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTxns.map((t) => (
              <tr key={t._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t._id}</td>
                <td className="p-3 capitalize">{t.type}</td>
                <td className="p-3">{t.amount}</td>
                <td className="p-3">{label(t.from)}</td>
                <td className="p-3">{label(t.to)}</td>
                <td className="p-3">{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {txns.length === 0 && (
              <tr>
                <td className="p-3 text-center text-gray-500" colSpan={6}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination Controls */}
      {txns.length > itemsPerPage && (
  <div className="flex flex-wrap justify-center items-center mt-4 gap-2 overflow-x-auto px-2">
    {/* Previous Button */}
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 whitespace-nowrap"
    >
      Prev
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-1 rounded whitespace-nowrap ${
          page === currentPage
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        {page}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 whitespace-nowrap"
    >
      Next
    </button>
  </div>
)}

    </div>
  );
};

export default AdminTransactionsPage;
