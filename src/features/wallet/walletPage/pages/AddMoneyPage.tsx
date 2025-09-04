/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAddMoneyMutation } from "../../wallet.api";

const AddMoneyPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [balance, setBalance] = useState<number>(1500); // demo balance
  const [success, setSuccess] = useState<boolean>(false);

  const [addMoney] = useAddMoneyMutation();

  const handleAddMoney = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await addMoney({ amount }).unwrap();
      setBalance((prev) => prev + amount); // demo balance update
      toast.success("Money added successfully");
      setAmount(0);
      setSuccess(true);

      // success animation hide after 2s
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      toast.error("Failed to add money");
    }
  };

  const quickAdd = (value: number) => {
    setAmount(value);
  };

  return (
    <div className="max-w-md mx-auto pt-5 md:pt-10 p-4">
      <Card className="p-6 text-center shadow-md space-y-6">
        {/* Top Icon */}
        {success ? (
          <FaCheckCircle className="text-green-600 text-5xl mx-auto animate-bounce" />
        ) : (
          <FaArrowUp className="text-blue-600 text-5xl mx-auto" />
        )}

        {/* Balance Info */}
        <div>
          <h2 className="text-xl font-semibold">Add Money to Wallet</h2>
          <p className="text-gray-500 text-sm mt-1">
            Current Balance:{" "}
            <span className="font-bold text-green-600">BDT {balance}</span>
          </p>
        </div>

        {/* Input */}
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border rounded mb-2"
        />

        {/* Quick Add Buttons */}
        <div className="flex justify-center gap-2 mb-4">
          {[100, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => quickAdd(val)}
              className="px-3 py-1 bg-gray-100 border rounded hover:bg-amber-100 text-sm"
            >
              +BDT {val}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleAddMoney}
          className="w-full bg-amber-600 text-white p-2 rounded hover:bg-amber-700 transition"
        >
          Add Money
        </button>
      </Card>
    </div>
  );
};

export default AddMoneyPage;
