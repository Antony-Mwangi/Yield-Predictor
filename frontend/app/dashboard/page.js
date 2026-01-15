"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <p>Welcome to your maize yield dashboard.</p>
    </div>
  );
}
