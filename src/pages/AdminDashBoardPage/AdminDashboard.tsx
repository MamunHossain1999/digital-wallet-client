/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaWallet, FaExchangeAlt } from "react-icons/fa";
import { useGetAllWalletsQuery } from "./allAdminApi/walletAdminApi";
import { useGetAllTransactionsQuery } from "./allAdminApi/transactionAdminApi";


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "agent";
  status: string;
}



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const { data: wallets = [], isLoading: walletsLoading } = useGetAllWalletsQuery();
  const { data: transactions = [], isLoading: txnsLoading } = useGetAllTransactionsQuery();

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await axios.get<User[]>(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/all`,
          { withCredentials: true }
        );
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  if (loadingUsers || walletsLoading || txnsLoading) {
    return <p className="text-center mt-20 text-lg">Loading Dashboard...</p>;
  }

  // Chart Data
  const userRolesData = [
    { name: "Admin", value: users.filter((u) => u.role === "admin").length },
    { name: "User", value: users.filter((u) => u.role === "user").length },
    { name: "Agent", value: users.filter((u) => u.role === "agent").length },
  ];

  const walletBalancesData = wallets.map((w: any) => ({
    name: typeof w.user === "string" ? w.user : w.user?.name ?? "Unknown",
    value: w.balance,
  }));

  const txnTypesData = [
    { name: "Deposit", value: transactions.filter((t: any) => t.type === "deposit").length },
    { name: "Withdraw", value: transactions.filter((t: any) => t.type === "withdraw").length },
    { name: "Transfer", value: transactions.filter((t: any) => t.type === "transfer").length },
  ];

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 text-2xl">
            <FaUsers />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase">Total Users</h2>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 text-2xl">
            <FaWallet />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase">Total Wallets</h2>
            <p className="text-2xl font-bold text-gray-800">{wallets.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 text-yellow-600 text-2xl">
            <FaExchangeAlt />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase">Total Transactions</h2>
            <p className="text-2xl font-bold text-gray-800">{transactions.length}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users by Role */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Users by Role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userRolesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {userRolesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Wallet Balances */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Wallet Balances</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={walletBalancesData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions by Type */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Transactions by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={txnTypesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {txnTypesData.map((_, index) => (
                  <Cell key={`cell-tx-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Users & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((t: any) => (
                <tr key={t._id} className="border-b">
                  <td className="p-2 capitalize">{t.type}</td>
                  <td className="p-2">${t.amount}</td>
                  <td className="p-2">{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
