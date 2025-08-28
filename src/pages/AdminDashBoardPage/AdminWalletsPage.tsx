/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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

  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; //proti page a koto item dekhabo

  // total koto page hobe
  const totalPages = Math.ceil(wallets.length / itemsPerPage);

  // current page er data slice
  const paginatedWallets = wallets.slice(
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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Wallets</h1>

      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
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
                <td className="p-3">
                  {new Date(w.createdAt).toLocaleString()}
                </td>
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
            {wallets.length === 0 && (
              <tr>
                <td className="p-3 text-center text-gray-500" colSpan={5}>
                  No wallets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination Controls */}
      {wallets.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminWalletsPage;
