import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!admin) return <p className="text-center mt-20">No admin found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
      <div className="space-y-3">
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Role:</strong> {admin.role}</p>
        <p><strong>Status:</strong> {admin.status}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
