import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
   return (
    
      <div className="bg-[#0f1924] w-full h-screen sm:p-8 px-5 flex flex-col justify-center items-center text-white">
        <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-[28px] text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2.5 ">
            Welcome to DealerDesk
          </h1>
          <p className="text-gray-300 px-6 text-[18px]">
            Mini Dealer Portal ! B2B ordering platform
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <Link
            href="/register"
            className="bg-[#315572] text-white py-[13px] text-center rounded font-bold hover:bg-[#587995] transition"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="bg-[#253748] py-[13px] text-center rounded font-bold hover:bg-[#3e5367] transition"
          >
            Already Registered? Login
          </Link>
        </div>
        </div>
      </div>
  );
}
