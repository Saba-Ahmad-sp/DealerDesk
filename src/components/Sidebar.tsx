"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Box, ShoppingCart, List } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
    { name: "Products", href: "/products", icon: <Box size={18} /> },
    { name: "My Orders", href: "/orders", icon: <List size={18} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingCart size={18} /> },
  ];
  return (
    <>
      <aside className="bg-[#181f26] border-r-1 border-r-gray-800 text-white flex justify-center pt-4 px-3">
        <ul className="space-y-3 w-36 lg:w-44 shadow-md">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name} className="sm">
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors
                  ${isActive ? "bg-white text-black font-semibold" : "hover:bg-gray-700"}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      </aside>
    </>
  );
};

export default Sidebar;
