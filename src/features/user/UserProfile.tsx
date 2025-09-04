import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">You are not logged in</h2>
        <Link
          to="/login"
          className="bg-amber-600 text-white px-6 py-2 rounded-lg shadow hover:bg-amber-500 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-7xl text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
            <span className="font-medium text-gray-700">Name</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
            <span className="font-medium text-gray-700">Email</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
       
          {user.role && (
            <div className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">Role</span>
              <span className="text-gray-900 capitalize">{user.role}</span>
            </div>
          )}
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/profile/edit"
            className="bg-amber-600 text-white px-6 py-2 rounded-lg shadow hover:bg-amber-500 transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
