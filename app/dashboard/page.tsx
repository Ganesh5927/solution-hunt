"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/participant");
  }, [router]);

  return (
    <main className="dashboard-shell">
      <p className="mono">REDIRECTING TO PARTICIPANT DASHBOARD...</p>
    </main>
  );
}
