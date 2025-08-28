import { useState } from "react";
import { useLoginMutation } from "@/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLoginButton from "@/component/googleLogin/GoogleLoginButton";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      dispatch(setUser({ ...res.user, accessToken: res.accessToken }));
      toast.success("Login successful");
      navigate("/");
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 cursor-pointer hover:bg-amber-500 text-white rounded-lg py-3 font-medium transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <GoogleLoginButton />

        {/* Register Link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-amber-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
