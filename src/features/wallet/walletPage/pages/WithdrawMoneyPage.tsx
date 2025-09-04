/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { FaArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { useWithdrawMoneyMutation } from "../../wallet.api";

const WithdrawMoneyPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(5000); // demo balance
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();

  const handleWithdraw = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      await withdrawMoney({ amount }).unwrap();
      toast.success("Money withdrawn successfully");
      setBalance((prev) => prev - amount); // update demo balance
      setAmount(0);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to withdraw money");
    }
  };

  return (
    <div className="pt-5 md:pt-10 flex items-center justify-center p-6">
      <Card className="p-6 text-center shadow-md w-full max-w-md">
        <FaArrowDown className="text-red-600 text-4xl mx-auto mb-2" />
        <h2 className="text-xl font-semibold mb-2">Withdraw Money</h2>
        <p className="text-gray-600 mb-4">
          Current Balance: <span className="font-bold">BDT {balance}</span>
        </p>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Quick Amount Buttons */}
        <div className="flex justify-center gap-2 mb-4">
          {[100, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
            >
              BDT {val}
            </button>
          ))}
        </div>

        <button
          onClick={handleWithdraw}
          disabled={isLoading}
          className={`w-full text-white p-2 rounded transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isLoading ? "Processing..." : "Withdraw"}
        </button>
      </Card>
    </div>
  );
};

export default WithdrawMoneyPage;
