/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import { FaPaperPlane } from "react-icons/fa";
import { useAgentSendMoneyMutation } from "../agentApi/agentTransactionApi";

export default function AgentSendMoney() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [sendMoney, { isLoading }] = useAgentSendMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMoney({email, amount }).unwrap();
      toast.success("💸 Money sent successfully!");
      setEmail("");
      setAmount(0);
    } catch (err: any) {
      toast.error(err?.data?.message || "Send failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <FaPaperPlane className="text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Send Money</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
          {/* Recipient Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              name="recipient-email"           // <-- unique name important
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter recipient email"
              required
              autoComplete="email"            // <-- enable auto-suggestion
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              required
              autoComplete="off"               // amount shouldn't autocomplete
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            
            {/* Quick Amount Buttons */}
            <div className="flex justify-center gap-2 mt-3">
              {[100, 500, 1000, 2000, 5000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className="px-3 py-1 bg-gray-100 border rounded-lg hover:bg-purple-100 text-sm font-medium transition-colors"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <FaPaperPlane /> Send Money
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
