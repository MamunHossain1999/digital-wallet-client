import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSendMoneyMutation } from "../../wallet.api";

const SendMoneyPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [sendMoney] = useSendMoneyMutation();
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    if (!receiverEmail || amount <= 0) {
      toast.error("Please enter valid details");
      return;
    }

    try {
      await sendMoney({ receiverEmail, amount }).unwrap();
      toast.success("Money sent successfully");

      setReceiverEmail("");
      setAmount(0);
      setSuccess(true);

      // success animation hide after 2s
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      toast.error("Failed to send money");
    }
  };

  return (
    <div className="max-w-md mx-auto pt-5 md:pt-10 p-4">
      <Card className="p-6 text-center shadow-md space-y-6">
        {/* Icon / Success State */}
        {success ? (
          <FaCheckCircle className="text-green-600 text-5xl mx-auto animate-bounce" />
        ) : (
          <FaPaperPlane className="text-purple-600 text-5xl mx-auto" />
        )}

        <h2 className="text-xl font-semibold mb-2">Send Money</h2>
        <p className="text-gray-500 text-sm">
          Enter receiver email & amount to transfer
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Receiver Email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          autoComplete="email"
        />

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border rounded mb-2"
        />

        {/* Quick Amount Buttons */}
        <div className="flex justify-center gap-2 mb-4">
          {[100, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className="px-3 py-1 bg-gray-100 border rounded hover:bg-purple-100 text-sm"
            >
              BDT {val}
            </button>
          ))}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
        >
          Send Money
        </button>
      </Card>
    </div>
  );
};

export default SendMoneyPage;
