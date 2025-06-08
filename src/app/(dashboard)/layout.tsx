"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen md:overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="flex flex-1 md:pt-0">
        <div className="fixed md:top-14 top-12 md:left-0 md:h-[calc(100vh-4rem)] z-40">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
        <main className="flex-1 p-4 overflow-y-auto bg-[#21364A] w-full  md:ml-56 md:mt-14 mt-12 ">
          {children}
        </main>
      </div>
    </div>
  );
}
