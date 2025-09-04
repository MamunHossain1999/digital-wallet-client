/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Search & Sort
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/all`,
          { withCredentials: true }
        );
        setUsers(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 🔹 Filter + Sort users
  const filteredUsers = useMemo(() => {
    let data = [...users];
    if (search.trim()) {
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    data.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return data;
  }, [users, search, sortOrder]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-red-500 mt-6 text-center">{error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-64"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-2 py-2 w-full sm:w-auto"
        >
          <option value="desc">Newest → Oldest</option>
          <option value="asc">Oldest → Newest</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, idx) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
