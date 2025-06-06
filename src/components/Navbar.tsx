"use client";

import { Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className="w-full bg-[#141A1F] border-b border-gray-800 shadow-[0_4px_6px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.3)] flex items-center px-4 py-3">
      <div className="md:hidden mr-4 cursor-pointer" onClick={toggleSidebar}>
        <Menu className="text-white" size={24} />
      </div>
      <span className="text-white font-semibold">Navbar</span>
    </div>
  );
};

export default Navbar;
