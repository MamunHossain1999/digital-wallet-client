// import { useState } from "react";

// interface Transaction {
//   id: number;
//   type: "income" | "expense";
//   title: string;
//   amount: number;
//   date: string;
// }

// const transactions: Transaction[] = [
//   { id: 1, type: "income", title: "Salary", amount: 2000, date: "2025-08-01" },
//   { id: 2, type: "expense", title: "Shopping", amount: -300, date: "2025-08-02" },
//   { id: 3, type: "income", title: "Freelance", amount: 500, date: "2025-08-03" },
//   { id: 4, type: "expense", title: "Food", amount: -150, date: "2025-08-04" },
// ];

// export default function TransactionPage() {
//   const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
//   const [search, setSearch] = useState("");

//   const filteredTransactions = transactions.filter((t) => {
//     if (filter !== "all" && t.type !== filter) return false;
//     if (search && !t.title.toLowerCase().includes(search.toLowerCase()))
//       return false;
//     return true;
//   });

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* Page Title */}
//       <h1 className="text-2xl font-bold mb-4">Transactions</h1>

//       {/* Search + Filter */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search transactions..."
//           className="border rounded-lg p-2 w-full md:w-1/3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <div className="flex gap-2">
//           <button
//             onClick={() => setFilter("all")}
//             className={`px-4 py-2 rounded-lg ${
//               filter === "all"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter("income")}
//             className={`px-4 py-2 rounded-lg ${
//               filter === "income"
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             Income
//           </button>
//           <button
//             onClick={() => setFilter("expense")}
//             className={`px-4 py-2 rounded-lg ${
//               filter === "expense"
//                 ? "bg-red-500 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             Expense
//           </button>
//         </div>
//       </div>

//       {/* Transactions List */}
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-700">
//               <th className="p-3">Title</th>
//               <th className="p-3">Type</th>
//               <th className="p-3">Amount</th>
//               <th className="p-3">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.map((t) => (
//               <tr
//                 key={t.id}
//                 className="border-b hover:bg-gray-50 transition"
//               >
//                 <td className="p-3">{t.title}</td>
//                 <td className="p-3 capitalize">{t.type}</td>
//                 <td
//                   className={`p-3 font-semibold ${
//                     t.type === "income" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {t.amount}$
//                 </td>
//                 <td className="p-3">{t.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


const TransactionPage = () => {
  return (
    <div>
      <h1>Transaction History</h1>
      {/* Transaction list will go here */}
    </div>
  );
};

export default TransactionPage;
