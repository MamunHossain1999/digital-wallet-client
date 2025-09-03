// import React,{ useState } from "react";
// import { useTopUpMutation } from "../transactionApi/transactionApi";

// const TopUpForm = () => {
//   const [amount, setAmount] = useState(0);
//   const [topUp, { isLoading }] = useTopUpMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await topUp({ amount }).unwrap();
//       alert(`Top-up successful: ${res.trx.amount}`);
//     } catch (err: any) {
//       alert(err?.data?.message || "Top-up failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         placeholder="Enter amount"
//         required
//       />
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "Processing..." : "Top Up"}
//       </button>
//     </form>
//   );
// };

// export default TopUpForm;
