/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { User } from "@/types/user"; // User type should have { name, email, password, role }
import { useRegisterUserMutation } from "./authApi";


const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser(formData).unwrap(); // unwrap to get actual response
      toast.success("Registered successfully!");
      setFormData({ name: "", email: "", password: "", role: "user" });
      navigate("/login");
    } catch (err: any) {
      setError(err?.data?.message || "Failed to register");
      toast.error(err?.data?.message || "Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center mb-6">Register Wallet</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border px-3 py-2 rounded"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border px-3 py-2 rounded"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              minLength={6}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Role Select */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-600 text-white py-2 rounded hover:bg-amber-500 disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">OR</div>

        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
