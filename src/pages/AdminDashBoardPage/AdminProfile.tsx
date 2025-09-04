import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { FaUserShield, FaEnvelope, FaIdBadge } from "react-icons/fa";

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "agent";
  status: string;
}

const AdminProfile: React.FC = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get<Admin>(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/me`,
          { withCredentials: true }
        );
        setAdmin(res.data);
      } catch {
        console.error("Failed to fetch admin profile");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600 mt-20">Loading...</p>;
  if (!admin)
    return <p className="text-center text-gray-600 mt-20">No admin found</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      {/* Profile Card */}
      <Card className="p-6 mb-6 text-center shadow-md bg-white border border-gray-100 rounded-xl">
        <img
          src="https://i.pravatar.cc/120?img=12"
          alt="Admin Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{admin.name}</h2>
        <p className="text-gray-600">{admin.email}</p>
        <p className="text-gray-500 capitalize">{admin.role}</p>
        <p className="text-sm text-gray-400">Status: {admin.status}</p>
      </Card>

      {/* Info Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-4">
        <Card className="p-4 text-center shadow-md bg-white border border-gray-100 rounded-xl flex flex-col items-center">
          <FaUserShield className="text-red-600 text-3xl mb-2" />
          <h2 className="text-lg font-semibold text-gray-700">Role</h2>
          <p className="text-xl font-bold text-red-700">{admin.role}</p>
        </Card>

        <Card className="p-4 text-center shadow-md bg-white border border-gray-100 rounded-xl flex flex-col items-center">
          <FaEnvelope className="text-blue-600 text-3xl mb-2" />
          <h2 className="text-lg font-semibold text-gray-700">Email</h2>
          <p className="text-xl font-bold text-blue-700">{admin.email}</p>
        </Card>

        <Card className="p-4 text-center shadow-md bg-white border border-gray-100 rounded-xl flex flex-col items-center">
          <FaIdBadge className="text-green-600 text-3xl mb-2" />
          <h2 className="text-lg font-semibold text-gray-700">Status</h2>
          <p className="text-xl font-bold text-green-700">{admin.status}</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
