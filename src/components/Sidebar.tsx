"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Box, ShoppingCart, List } from "lucide-react";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
    { name: "Products", href: "/products", icon: <Box size={18} /> },
    { name: "My Orders", href: "/orders", icon: <List size={18} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingCart size={18} /> },
  ];
  return (
    <>
      <aside
        className={`
        bg-[#0f1924] text-white pt-4 px-6 transition-all duration-300 h-full
        ${isOpen ? "block absolute z-50 w-48" : "hidden"}
        md:block
      `}
      >
        <ul className="space-y-3 w-36 lg:w-44 ">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="sm">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors
                  ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "hover:bg-gray-700"
                  }
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
