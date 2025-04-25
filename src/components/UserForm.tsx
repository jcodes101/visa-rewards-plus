import React, { useState } from "react";
import { Search } from "lucide-react";

interface UserFormProps {
  onSubmit: (userId: string) => void;
  isLoading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, isLoading }) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError("Please enter a user ID");
      return;
    }
    setError("");
    onSubmit(userId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Enter Your User Is
      </h2>
      <p className="text-gray-600 mb-6">
        Access your personalized rewards by entering your User ID below.
        <br />
        <span className="text-sm italic mt-1 block">
          (For demo purposes, try: USER2081, USER3089, or USER1228)
        </span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className={`w-full px-4 py-3 rounded-md border ${
              error ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[#1a1f71]`}
            placeholder="Enter your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={isLoading}
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={20} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#1a1f71] text-white py-3 rounded-md font-medium hover:bg-[#151b5e] transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            "View My Rewards"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
