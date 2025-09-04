import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaWallet, FaUser, FaHistory } from "react-icons/fa";

interface Agent {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "agent";
  status: string;
  walletBalance: number;
  totalCustomers: number;
  transactions: number;
}

export default function AgentProfile() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axios.get<Agent>(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/agent-profile`,
          { withCredentials: true }
        );
        setAgent(res.data);
      } catch (err) {
        console.error("Failed to fetch agent profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgent();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!agent) return <p className="text-center mt-20">No agent found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Info */}
      <Card className="p-6 mb-6 text-center shadow-md">
        <img
          src="https://i.pravatar.cc/120"
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold">{agent.name}</h2>
        <p className="text-gray-600">{agent.email}</p>
        <p className="text-gray-500 capitalize">{agent.role}</p>
        <p className="text-sm text-gray-400">Status: {agent.status}</p>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center shadow-md">
          <FaWallet className="text-green-600 text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Wallet Balance</h2>
          <p className="text-xl font-bold text-green-700">
            BDT {agent.walletBalance}
          </p>
        </Card>

        <Card className="p-4 text-center shadow-md">
          <FaUser className="text-blue-600 text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-xl font-bold text-blue-700">
            {agent.totalCustomers}+
          </p>
        </Card>

        <Card className="p-4 text-center shadow-md">
          <FaHistory className="text-purple-600 text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Transactions</h2>
          <p className="text-xl font-bold text-purple-700">
            {agent.transactions}+
          </p>
        </Card>
      </div>
    </div>
  );
}
