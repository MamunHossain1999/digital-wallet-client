/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { FaHistory } from "react-icons/fa";
import { useAgentGetMyTransactionsQuery } from "../agentApi/agentTransactionApi";

export default function TransactionHistoryPage() {
  const { data, isLoading, error } = useAgentGetMyTransactionsQuery();
  const transactions = data?.transactions || [];

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Filtered & sorted transactions
  const filteredTransactions = useMemo(() => {
    let txs = [...transactions];

    if (search.trim()) {
      txs = txs.filter(
        (tx: any) =>
          tx.type.toLowerCase().includes(search.toLowerCase()) ||
          tx.status.toLowerCase().includes(search.toLowerCase()) ||
          tx.from?.toLowerCase().includes(search.toLowerCase()) ||
          tx.to?.toLowerCase().includes(search.toLowerCase())
      );
    }

    txs.sort((a: any, b: any) =>
      sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    );

    return txs;
  }, [transactions, search, sortOrder]);

  // Pagination
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  if (isLoading)
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        ❌ Failed to load transactions
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto  px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-100">
        {/* Header & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <FaHistory className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">My Transactions</h2>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search by type, status, from, to"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-3 py-2 w-full sm:w-64 lg:w-64"
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="border rounded px-2 py-2 w-full sm:w-auto lg:w-auto"
            >
              <option value="desc">Amount High → Low</option>
              <option value="asc">Amount Low → High</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px] sm:min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left text-sm">
                <th className="px-4 py-3 rounded-tl-lg">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((tx: any, idx: number) => (
                  <tr
                    key={tx._id}
                    className={`text-sm border-b hover:bg-gray-50 transition ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{tx.type}</td>
                    <td className="px-4 py-3 text-gray-800">${Number(tx.amount).toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-600">{tx.from || "-"}</td>
                    <td className="px-4 py-3 text-gray-600">{tx.to || "-"}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : tx.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-6">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-amber-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
