"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // 👈 Eye icon imports

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    fullName.trim() !== "" && isEmailValid(email) && password.trim() !== "";

  const handleSignup = () => {
    if (!isFormValid) {
      alert("Please fill all required fields with valid data.");
      return;
    }

    const userData = {
      fullName,
      email,
      password,
    };

    localStorage.setItem("DealerDeskUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      handleSignup();
    }
  };

  return (
    <div className="bg-[#0f1924] min-h-screen flex items-center justify-center text-white px-5 sm:p-8">
      <div className="w-full max-w-lg sm:p-8">
        {/* Header */}
        <div className="mb-[28px] text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2.5">
            Create your DealerDesk Account
          </h2>
          <p className="text-gray-300 px-6 text-[18px]">
            Sign up to manage your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-[#0f1924] px-1 text-xs text-[#5d90b9] font-medium">
              Full Name
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              className="w-full border border-gray-600 bg-transparent text-white rounded-md py-2 px-3 pt-4 text-sm outline-none focus:ring-1 focus:ring-[#5d90b9]"
              required
            />
          </div>

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

          {/* Password with Eye Toggle */}
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-[#0f1924] px-1 text-xs text-[#5d90b9] font-medium">
              Password
            </span>
            <input
              type={showPassword ? "text" : "password"} // 👈 Toggle input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-600 bg-transparent text-white rounded-md py-2 px-3 pt-4 pr-10 text-sm outline-none focus:ring-1 focus:ring-[#5d90b9]"
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
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
