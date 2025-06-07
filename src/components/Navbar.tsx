"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface User {
  name: string;
  email: string;
}

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("DealerDeskUser");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedUser && isLoggedIn === "true") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.fullName || "N/A",
          email: parsedUser.email || "N/A",
        });
      } catch (error) {
        console.log("Failed to parse user data:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    router.push("/");
  };

  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full bg-[#141A1F] border-b border-gray-800 shadow-[0_4px_6px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.3)] px-4 flex justify-between">
      <div className="flex items-center">
        <div className="md:hidden mr-4 cursor-pointer" onClick={toggleSidebar}>
          <Menu className="text-white" size={24} />
        </div>
        <div className="relative h-12 w-26 md:h-14 md:w-36 ml-[-14px] md:ml-[-6px]">
          <Image
            src="/DDlogo.png"
            alt="Dealer Desk Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex gap-3 items-center text-[#8d8980] cursor-pointer">
        <span>{user.name}</span>
        <Link href="/cart">
          <div className="relative">
            <ShoppingCart
              className="active:text-gray-300 md:hover:text-gray-300 transition"
              size={22}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
        <LogOut
          size={22}
          className="text-red-900 md:hover:text-red-600 active:text-red-600"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;
