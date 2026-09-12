"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { Participant } from "@/lib/types";

export default function ParticipantIdCard({ participant }: { participant: Participant }) {
  const [qrCode, setQrCode] = useState("");
  const participantId = participant.participantId || participant.registrationId;
  const qrData = `NEXORA 2026 | Team Name: ${participant.teamName || "INDIVIDUAL"} | Participant Name: ${participant.fullName} | Participant ID: ${participantId}`;

  useEffect(() => {
    QRCode.toDataURL(qrData, { margin: 1, width: 260, color: { dark: "#071426", light: "#ffffff" } })
      .then(setQrCode).catch(() => setQrCode(""));
  }, [qrData]);

  return (
    <article className="admin-id-record">
      <div className="admin-id-record-heading">
        <div><span className="eyebrow">GENERATED ID</span><h3>{participant.fullName}</h3></div>
        <button type="button" className="ghost-button small-button" onClick={() => window.print()}>PRINT CARD</button>
      </div>
      <div className="participant-id-card">
        <section className="participant-id-card-face participant-id-card-front">
          <img className="id-card-template-image" src="/image.png" alt="AMR Solution Hunt participant ID card template" />
          <strong className="id-card-template-event-name">NEXORA 2026</strong>
          <strong className="id-card-template-value id-card-team-value">{participant.teamName || "INDIVIDUAL"}</strong>
          <strong className="id-card-template-value id-card-presenter-value">{participant.fullName}</strong>
          <strong className="id-card-template-id">HACKATHON ID: {participantId}</strong>
        </section>
        <section className="participant-id-card-face participant-id-card-back">
          <div className="id-card-back-heading"><span>AMR NEXORA 2026</span><strong>VERIFIED ACCESS PASS</strong></div>
          <div className="id-card-qr-wrap">{qrCode ? <img src={qrCode} alt={`QR code for ${participantId}`} /> : <span>GENERATING QR</span>}<small>SCAN TO VERIFY PARTICIPANT</small></div>
          <div className="id-card-back-details"><div><span>HACKATHON ID</span><strong>{participant.hackathonId || participantId}</strong></div><div><span>STATUS</span><strong>VERIFIED</strong></div></div>
          <p>This card is valid only for the registered participant. Present it at event checkpoints.</p>
          <footer><span>AM REDDY MEMORIAL COLLEGE OF ENGINEERING &amp; TECHNOLOGY</span><b>2026</b></footer>
        </section>
      </div>
    </article>
  );
}