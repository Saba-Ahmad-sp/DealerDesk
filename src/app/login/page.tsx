"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const storedUser = localStorage.getItem("DealerDeskUser");
    if (!storedUser) {
      alert("No user found. Please create an account.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email === email && parsedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      handleLogin();
    }
  };

  return (
    <div className="bg-[#0f1924] min-h-screen flex items-center justify-center text-white px-5 sm:p-8">
      <div className="w-full max-w-lg sm:p-8">
        {/* Header */}
        <div className="mb-[28px] text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2.5">
            Sign in to DealerDesk
          </h2>
          <p className="text-gray-300 px-6 text-[18px]">
            Access your account and manage orders
          </p>
        </div>

        {/* Inputs */}
         <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-[#0f1924] px-1 text-xs text-[#5d90b9] font-medium">
              Email Address
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full border border-gray-600 bg-transparent text-white rounded-md py-2 px-3 pt-4 text-sm outline-none focus:ring-1 focus:ring-[#5d90b9]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-[#0f1924] px-1 text-xs text-[#5d90b9] font-medium">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-600 bg-transparent text-white rounded-md py-2 px-3 pt-4 text-sm outline-none focus:ring-1 focus:ring-[#5d90b9]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`mt-2 py-3 w-full rounded font-semibold transition ${
              isFormValid
                ? "bg-[#315572] hover:bg-[#587995] text-white cursor-pointer"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
