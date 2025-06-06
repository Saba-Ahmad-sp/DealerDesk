"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("DealerDeskUser");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedUser && isLoggedIn === "true") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.fullName || 'N/A',
          email: parsedUser.email || 'N/A'
        })
      } catch (error) {
        console.log('Failed to parse user data:', error);
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  }, [router]);

  return (
    <div className="text-gray-200">
      <h1 className="text-2xl font-semibold md:text-3xl">Welcome Dealer {user.name}</h1>
      <p className="text-md mt-2 md:text-lg">This is your dashboard.</p>
    </div>
  );
};

export default DashboardPage;
