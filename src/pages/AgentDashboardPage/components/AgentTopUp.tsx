/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { toast } from "react-toastify";
import { useAgentTopUpMutation } from "../agentApi/agentTransactionApi";

export default function AgentTopUp() {
  const [amount, setAmount] = useState<number>(0);
  const [topUp, { isLoading }] = useAgentTopUpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("💡 Form submitted with amount:", amount); // <-- console log

    try {
      const response = await topUp({ amount }).unwrap();
      console.log("✅ Top up response:", response); // <-- console log
      toast.success("✅ Top up successful!");
      setAmount(0);
    } catch (err: any) {
      console.error("❌ Top up error:", err); // <-- console log
      toast.error(err?.data?.message || "❌ Top up failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        💳 Agent Top Up
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Amount input */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            min={1}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="e.g. 500"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none
                       text-gray-700 shadow-sm"
            required
          />
          
          {/* Quick Amount Buttons */}
          <div className="flex justify-center gap-2 mt-3">
            {[500, 1000, 2000, 5000, 10000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className="px-3 py-1 bg-gray-100 border rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors"
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 
                     text-white font-medium py-2.5 rounded-lg
                     transition-all duration-200 shadow-md 
                     disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Processing..." : "Top Up"}
        </button>
      </form>
    </div>
  );
}
