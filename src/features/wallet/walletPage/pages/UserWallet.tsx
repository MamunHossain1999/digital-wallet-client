import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { FaWallet, FaArrowUp, FaArrowDown, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import WalletTransactions from "./WalletTransactions";


interface Transaction {
  _id: string;
  type: "add" | "withdraw" | "send";
  amount: number;
  date: string;
  to?: string; // for send
}

interface Wallet {
  balance: number;
  transactions: Transaction[];
}

const UserWallet: React.FC = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch wallet data
  const fetchWallet = async () => {
    try {
      const res = await axios.get<Wallet>(`${import.meta.env.VITE_API_BASE_URL}/api/wallet/my`, {
        withCredentials: true,
      });
      setWallet(res.data);
    } catch (err) {
      console.error("Failed to fetch wallet", err);
      toast.error("Failed to fetch wallet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!wallet) return <p className="text-center mt-20">Wallet not found</p>;

  return (
    <div className="container mx-auto p-6 space-y-6 mt-12">
      {/* Wallet Balance */}
      <Card className="p-6 text-center shadow-md">
        <FaWallet className="text-green-600 text-4xl mx-auto mb-2" />
        <h2 className="text-xl font-semibold">Wallet Balance</h2>
        <p className="text-3xl font-bold text-green-700">BDT {wallet.balance}</p>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button onClick={() => navigate("/user-addmoney")} className="flex-1 flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          <FaArrowUp /> Add Money
        </button>
        <button onClick={() => navigate("/user-withdraw")} className="flex-1 flex items-center justify-center gap-2 p-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
          <FaArrowDown /> Withdraw
        </button>
        <button onClick={() => navigate("/user-sendmony")} className="flex-1 flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
          <FaPaperPlane /> Send Money
        </button>
      </div>

      {/* Transaction History */}
      <Card className="p-4 shadow-md">
        
        <WalletTransactions/>
      </Card>
    </div>
  );
};

export default UserWallet;
