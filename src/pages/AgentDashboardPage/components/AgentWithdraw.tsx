/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { toast } from "react-toastify";
import { FaExchangeAlt } from "react-icons/fa";
import { useAgentWithdrawMutation } from "../agentApi/agentTransactionApi";

export default function AgentWithdraw() {
  const [amount, setAmount] = useState<number>(0);
  const [withdraw, { isLoading }] =  useAgentWithdrawMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await withdraw({ amount }).unwrap();
      toast.success("✅ Withdraw successful!");
      setAmount(0);
    } catch (err: any) {
      toast.error(err?.data?.message || "❌ Withdraw failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <FaExchangeAlt className="text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Withdraw Funds</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Enter Amount
            </label>
            <input
              type="number"
              value={amount}
              min={1}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="e.g. 1000"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition text-gray-800"
            />
            
            {/* Quick Amount Buttons */}
            <div className="flex justify-center gap-2 mt-3">
              {[500, 1000, 2000, 5000, 10000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className="px-3 py-1 bg-gray-100 border rounded-lg hover:bg-green-100 text-sm font-medium transition-colors"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || amount <= 0}
            className={`w-full py-3 rounded-xl font-semibold cursor-pointer text-white shadow-md transition ${
              isLoading || amount <= 0
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </div>
    </div>
  );
}
