"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/participant-portal");
  }, [router]);

  return (
    <main className="dashboard-shell">
      <p className="mono">REDIRECTING TO PARTICIPANT PORTAL...</p>
    </main>
  );
}
