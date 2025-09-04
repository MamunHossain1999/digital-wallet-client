/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { useGetMyTransactionsQuery } from "../../../transation/transactionApi/transactionApi";

interface Transaction {
  _id: string;
  type: "add" | "withdraw" | "transfer";
  amount: number;
  fee?: number;
  status?: "completed" | "pending" | "failed";
  from?: string;
  to?: string;
}

const WalletTransactions: React.FC = () => {
  const { data, isLoading, isFetching, error, refetch } =
    useGetMyTransactionsQuery() as any;

  // Hooks at top
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const transactionsPerPage = 5;

  const transactions: Transaction[] = data?.transactions || [];

  // Filter + sort safely with a copy
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions]; // <-- copy to avoid mutation

    if (search) {
      filtered = filtered.filter(
        (trx) =>
          trx.type.toLowerCase().includes(search.toLowerCase()) ||
          trx.from?.toLowerCase().includes(search.toLowerCase()) ||
          trx.to?.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? (a.amount ?? 0) - (b.amount ?? 0)
        : (b.amount ?? 0) - (a.amount ?? 0)
    );

    return filtered;
  }, [transactions, search, sortOrder]);

  // Pagination
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  // Color helpers
  const getTypeColor = (type: string) => {
    switch (type) {
      case "add":
        return "bg-green-100 text-green-800";
      case "withdraw":
        return "bg-red-100 text-red-800";
      case "transfer":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading || isFetching) return <p>Loading transactions...</p>;
  if (error) return <p>Error fetching transactions</p>;

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold">My Transactions</h2>

        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by type, from, to"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full sm:w-auto"
          />

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border rounded px-2 py-2 w-full sm:w-auto"
          >
            <option value="desc">High → Low</option>
            <option value="asc">Low → High</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={() => refetch()}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500 transition w-full sm:w-auto"
          >
            Refresh
          </button>
        </div>
      </div>

      {currentTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Fee
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  From
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                  To
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((trx: Transaction) => (
                <tr key={trx._id} className="hover:bg-gray-50">
                  <td
                    className={`px-4 py-2 text-sm font-medium rounded ${getTypeColor(
                      trx.type
                    )}`}
                  >
                    {trx.type}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    BDT {trx.amount}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {trx.fee || 0}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm font-medium rounded ${getStatusColor(
                      trx.status
                    )}`}
                  >
                    {trx.status || "completed"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {trx.from || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {trx.to || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
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
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default WalletTransactions;
