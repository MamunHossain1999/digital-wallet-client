import MainLayout from "@/LayOutPages/MainLayout";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";
import AboutPage from "@/pages/aboutPage/AboutPage";
import ContactPage from "@/pages/contactPage/ContactPage";
import TermsPage from "@/pages/TermsPage/TermsPage";
import HomePage from "@/pages/HomePage";
import AdminDashboardLayout from "@/LayOutPages/AdminDashboardLayout";
import AdminDashboard from "@/pages/AdminDashBoardPage/AdminDashboard";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import UserWallet from "@/features/wallet/walletPage/pages/UserWallet";
import AdminWalletsPage from "@/pages/AdminDashBoardPage/AdminWalletsPage";
import AdminTransactionsPage from "@/pages/AdminDashBoardPage/AdminTransactionsPage";
import UsersTable from "@/pages/AdminDashBoardPage/UsersTable";
import AdminProfile from "@/pages/AdminDashBoardPage/AdminProfile";
import AgentLayoutDashboard from "@/LayOutPages/AgentLayoutDashboard";
import AgentDashboard from "@/pages/AgentDashboardPage/AgentDashboard";
import AgentTopUp from "@/pages/AgentDashboardPage/components/AgentTopUp";
import AgentWithdraw from "@/pages/AgentDashboardPage/components/AgentWithdraw";
import AgentSendMoney from "@/pages/AgentDashboardPage/components/AgentSendMoney";
import TransactionHistoryPage from "@/pages/AgentDashboardPage/components/TransactionHistoryPage";
import AgentProfile from "@/pages/AgentDashboardPage/components/AgentProfile";
import SendMoneyPage from "@/features/wallet/walletPage/pages/SendMoneyPage";
import WithdrawMoneyPage from "@/features/wallet/walletPage/pages/WithdrawMoneyPage";
import AddMoneyPage from "@/features/wallet/walletPage/pages/AddMoneyPage";
import UserProfile from "@/features/user/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/user-wallet",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <UserWallet />
          </PrivateRoute>
        ),
      },
      {
        path: "/user-sendmony",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <SendMoneyPage/>
          </PrivateRoute>
        ),
      },
        {
        path: "/user-withdraw",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <WithdrawMoneyPage/>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-addmoney",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <AddMoneyPage/>
          </PrivateRoute>
        ),
      },
        {
        path: "/profile",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <UserProfile/>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/terms",
        element: <TermsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },





  {
    path: "/admin",
    element: <AdminDashboardLayout />,
    children: [
      { path: "/admin", element: <AdminDashboard /> },
      {
        path: "/admin/user-profile",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/userTable",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <UsersTable />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/wallets",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminWalletsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/transactions",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminTransactionsPage />
          </PrivateRoute>
        ),
      },
    ],
  },


  {
    path: "/agent",
    element: <AgentLayoutDashboard />,
    children: [
      {
        path: "/agent",
        element: (
          <PrivateRoute allowedRoles={["agent"]}>
            <AgentDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/agent/agent-topup",
        element: (
          <PrivateRoute allowedRoles={["agent"]}>
            <AgentTopUp></AgentTopUp>
          </PrivateRoute>
        ),
      },
      {
        path: "/agent/agent-withdrow",
        element: (
          <PrivateRoute allowedRoles={["agent"]}>
            <AgentWithdraw />
          </PrivateRoute>
        ),
      },
      {
        path: "/agent/agent-send-money",
        element: (
          <PrivateRoute allowedRoles={["agent"]}>
            <AgentSendMoney />
          </PrivateRoute>
        ),
      },
      {
        path: "/agent/agent-transactios-history",
        element: (
          <PrivateRoute allowedRoles={["agent"]}>
            <TransactionHistoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/agent/agent-profile",
        element: (
        <PrivateRoute allowedRoles={["agent"]}><AgentProfile/></PrivateRoute>
      ),
      }
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
