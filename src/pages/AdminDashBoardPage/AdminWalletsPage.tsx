/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  useGetAllWalletsQuery,
  useToggleBlockMutation,
  type Wallet,
} from "./allAdminApi/walletAdminApi";

const getUserLabel = (u: Wallet["user"]) => {
  if (!u) return "—";
  if (typeof u === "string") return u;
  return u.name ?? u.email ?? u._id;
};

const AdminWalletsPage: React.FC = () => {
  const { data: wallets = [], isLoading, isError } = useGetAllWalletsQuery();
  const [toggleBlock, { isLoading: toggling }] = useToggleBlockMutation();

  // 🔹 Pagination & Search & Sort
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 10;

  // Filter & Sort wallets
  const filteredWallets = useMemo(() => {
    let w = [...wallets];
    if (search.trim()) {
      w = w.filter((wallet) => {
        const label = getUserLabel(wallet.user).toLowerCase();
        return label.includes(search.toLowerCase());
      });
    }
    w.sort((a, b) =>
      sortOrder === "asc" ? a.balance - b.balance : b.balance - a.balance
    );
    return w;
  }, [wallets, search, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredWallets.length / itemsPerPage);
  const paginatedWallets = filteredWallets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onToggle = async (id: string, current: boolean) => {
    try {
      await toggleBlock({ id, block: !current }).unwrap();
      toast.success(`Wallet ${current ? "unblocked" : "blocked"} successfully`);
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to update wallet");
    }
  };

  if (isLoading) return <p className="p-6">Loading wallets…</p>;
  if (isError) return <p className="p-6 text-red-600">Failed to load wallets</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">All Wallets</h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 items-start sm:items-center">
        <input
          type="text"
          placeholder="Search by user name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 w-full sm:w-64"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-2 py-2 w-full sm:w-auto"
        >
          <option value="desc">Balance High → Low</option>
          <option value="asc">Balance Low → High</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700 min-w-[600px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">User</th>
              <th className="p-3 border-b">Balance</th>
              <th className="p-3 border-b">Blocked</th>
              <th className="p-3 border-b">Created</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedWallets.map((w) => (
              <tr key={w._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{getUserLabel(w.user)}</td>
                <td className="p-3">{w.balance}</td>
                <td className="p-3">{w.isBlocked ? "Yes" : "No"}</td>
                <td className="p-3">{new Date(w.createdAt).toLocaleString()}</td>
                <td className="p-3">
                  <button
                    onClick={() => onToggle(w._id, w.isBlocked)}
                    disabled={toggling}
                    className={`px-3 py-1 rounded text-white ${
                      w.isBlocked ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {w.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
            {filteredWallets.length === 0 && (
              <tr>
                <td className="p-3 text-center text-gray-500" colSpan={5}>
                  No wallets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredWallets.length > itemsPerPage && (
        <div className="flex flex-wrap justify-center items-center mt-4 gap-2 overflow-x-auto px-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 whitespace-nowrap"
          >
            Prev
          </button>

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

export default AdminWalletsPage;
