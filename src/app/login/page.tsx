"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const triggerError = (message: string) => {
    setFormError(message);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  };

  const handleLogin = () => {
    if (!isEmailValid(email)) {
      triggerError("Please enter a valid email address.");
      return;
    }

    const storedUser = localStorage.getItem("DealerDeskUser");
    if (!storedUser) {
      triggerError("No user found. Please create an account.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email !== email) {
      triggerError("Wrong email address.");
      return;
    }

    if (parsedUser.password !== password) {
      triggerError("Incorrect password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      handleLogin();
    } else {
      triggerError("Please fill out all fields.");
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

        {/* Error Message */}
        <div
          className={`transition-opacity duration-500 ease-in-out mb-4 px-4 py-2 rounded-md text-sm bg-red-100 text-red-700 ${
            showError ? "opacity-100" : "opacity-0"
          }`}
        >
          {formError}
        </div>

        {/* Form */}
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-600 bg-transparent text-white rounded-md py-2 px-3 pt-4 text-sm outline-none focus:ring-1 focus:ring-[#5d90b9] pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
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
