"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/navigation/SiteHeader";
import { getCurrentParticipant } from "@/lib/identity";
import type { Participant } from "@/lib/types";

export default function PassportPage() {
  const router = useRouter();
  const [participant] = useState<Participant | null>(() => getCurrentParticipant());

  useEffect(() => {
    if (!participant) {
      router.replace("/participant-portal");
    }
  }, [participant, router]);

  if (!participant) {
    return <main className="passport-shell"><p className="mono">VERIFYING PASSPORT...</p></main>;
  }

  return (
    <main className="passport-page">
      <SiteHeader authenticated />
      <div className="passport-shell">
        <header className="passport-heading">
          <div>
            <p className="passport-eyebrow">NEXORA 2026 / VERIFIED IDENTITY</p>
            <h1>My hunt <span>passport.</span></h1>
            <p>Carry your participant identity through every stage of the hunt.</p>
          </div>
          <button type="button" className="passport-print-button" onClick={() => window.print()}>Print passport ↗</button>
        </header>

        <section className="passport-card" aria-label="Hackathon passport">
          <div className="passport-card-topline">
            <div>
              <p className="passport-card-label">PARTICIPANT PASS</p>
              <h2>2026</h2>
            </div>
            <div className="passport-card-type">VERIFIED PARTICIPANT<br /><strong>ACTIVE</strong></div>
          </div>
          <div className="passport-card-body">
            <div className="passport-identity">
              <div className="passport-avatar">{participant.fullName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
              <p className="passport-field-label">PARTICIPANT NAME</p>
              <h3>{participant.fullName}</h3>
              <p className="passport-id">HACKATHON ID CARD / ISSUED BY EVENT ADMIN</p>
            </div>
            <div className="passport-details">
              <div><span>COLLEGE</span><strong>{participant.college}</strong></div>
              <div><span>DEPARTMENT</span><strong>{participant.department || "—"}</strong></div>
              <div><span>PARTICIPATION TYPE</span><strong>{participant.participationType || "Solo"}</strong></div>
              <div><span>YEAR</span><strong>{participant.yearOfStudy || "—"}</strong></div>
              <div><span>CITY</span><strong>{participant.city || "—"}</strong></div>
              <div><span>STATUS</span><strong>CONFIRMED</strong></div>
            </div>
            <div className="passport-qr-panel"><span>ID card and QR code are issued by the event admin.</span></div>
          </div>
          <div className="passport-card-footer">
            <span>NEXORA 2026</span>
            <span>AM REDDY GROUP OF INSTITUTIONS</span>
          </div>
        </section>
      </div>
    </main>
  );
}
