import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaMoneyBillWave,
  FaExchangeAlt,
  FaHistory,
  FaPaperPlane,
  FaWallet,
  FaUserFriends,
} from "react-icons/fa";
import { motion } from "framer-motion";

import AgentTopUp from "./components/AgentTopUp";
import AgentWithdraw from "./components/AgentWithdraw";
import AgentSendMoney from "./components/AgentSendMoney";
import TransactionHistoryPage from "./components/TransactionHistoryPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AgentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("top-up");

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Agent Dashboard</h1>

      {/* Balance Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-md p-4 text-center">
          <FaWallet className="text-green-600 text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Wallet Balance</h2>
          <p className="text-xl font-bold text-green-700">BDT 12,500</p>
        </Card>

        <Card className="shadow-md p-4 text-center">
          <FaUserFriends className="text-blue-600 text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-xl font-bold text-blue-700">150+</p>
        </Card>

        <Card className="shadow-md p-4 text-center">
          <FaHistory className="text-purple-600 text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Transactions</h2>
          <p className="text-xl font-bold text-purple-700">320+</p>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <Tabs
            defaultValue="top-up"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Tab Headers */}
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
              <TabsTrigger value="top-up" className="flex items-center justify-center gap-2">
                <FaMoneyBillWave />
                <span className="text-sm sm:text-base">Top Up</span>
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="flex items-center justify-center gap-2">
                <FaExchangeAlt />
                <span className="text-sm sm:text-base">Withdraw</span>
              </TabsTrigger>
              <TabsTrigger value="send" className="flex items-center justify-center gap-2">
                <FaPaperPlane />
                <span className="text-sm sm:text-base">Send Money</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center justify-center gap-2">
                <FaHistory />
                <span className="text-sm sm:text-base">History</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="top-up" className="mt-2 sm:mt-4">
              <AgentTopUp />
            </TabsContent>

            <TabsContent value="withdraw" className="mt-2 sm:mt-4">
              <AgentWithdraw />
            </TabsContent>

            <TabsContent value="send" className="mt-2 sm:mt-4">
              <AgentSendMoney />
            </TabsContent>

            <TabsContent value="history" className="mt-2 sm:mt-4">
              <TransactionHistoryPage />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 text-white py-3 rounded-xl shadow-md font-semibold w-full"
        >
          + Quick Top Up
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-500 text-white py-3 rounded-xl shadow-md font-semibold w-full"
        >
          Withdraw Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-purple-500 text-white py-3 rounded-xl shadow-md font-semibold w-full"
        >
          Send Money
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-orange-500 text-white py-3 rounded-xl shadow-md font-semibold w-full"
        >
          View History
        </motion.button>
      </div>
    </div>
  );
};

export default AgentDashboard;
