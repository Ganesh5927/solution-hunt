"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import SiteHeader from "@/components/navigation/SiteHeader";
import { getCurrentParticipant } from "@/lib/identity";
import type { Participant } from "@/lib/types";

export default function PassportPage() {
  const router = useRouter();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    const saved = getCurrentParticipant();
    if (!saved) {
      router.replace("/participant-portal");
      return;
    }

    setParticipant(saved);
  }, [router]);

  useEffect(() => {
    if (!participant?.registrationId) return;
    QRCode.toDataURL(`Solution Hunt 2026\nRegistration ID: ${participant.registrationId}`, {
      margin: 1,
      width: 200,
      color: { dark: "#071426", light: "#ffffff" },
    }).then(setQrData).catch(() => setQrData(""));
  }, [participant]);

  if (!participant) {
    return <main className="passport-shell"><p className="mono">VERIFYING PASSPORT...</p></main>;
  }

  return (
    <main className="passport-page">
      <SiteHeader authenticated />
      <div className="passport-shell">
        <header className="passport-heading">
          <div>
            <p className="passport-eyebrow">SOLUTION HUNT 2026 / VERIFIED IDENTITY</p>
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
              <p className="passport-id">REGISTRATION ID / {participant.registrationId}</p>
            </div>
            <div className="passport-details">
              <div><span>COLLEGE</span><strong>{participant.college}</strong></div>
              <div><span>DEPARTMENT</span><strong>{participant.department || "—"}</strong></div>
              <div><span>PARTICIPATION TYPE</span><strong>{participant.participationType || "Solo"}</strong></div>
              <div><span>YEAR</span><strong>{participant.yearOfStudy || "—"}</strong></div>
              <div><span>CITY</span><strong>{participant.city || "—"}</strong></div>
              <div><span>STATUS</span><strong>CONFIRMED</strong></div>
            </div>
            <div className="passport-qr-panel">
              {qrData ? <Image className="passport-qr-image" src={qrData} width={150} height={150} unoptimized alt="Participant QR code" /> : <div className="passport-qr"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>}
              <span>SCAN TO VERIFY<br />PARTICIPANT</span>
            </div>
          </div>
          <div className="passport-card-footer">
            <span>SOLUTION HUNT 2026</span>
            <span>AM REDDY GROUP OF INSTITUTIONS</span>
          </div>
        </section>
      </div>
    </main>
  );
}
