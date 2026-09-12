"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { findParticipantByQrIdentifier, getStaffRole } from "@/lib/verification";

export default function VerificationScannerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [role, setRole] = useState<"Admin" | "Judge" | null>(null);
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [cameraState, setCameraState] = useState<"idle" | "starting" | "active">("idle");

  const openVerification = useCallback((value: string) => {
    const participant = findParticipantByQrIdentifier(value);
    if (!participant) {
      setError("Unknown or invalid participant QR. Check the code and try again.");
      return;
    }
    router.push(`/verify?participant=${encodeURIComponent(participant.participantId || participant.registrationId)}`);
  }, [router]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const existing = getStaffRole();
      const requested = new URLSearchParams(window.location.search).get("role");
      if (existing) setRole(existing);
      else if (requested === "Admin" || requested === "Judge") {
        window.sessionStorage.setItem("nexoraStaffRole", requested);
        setRole(requested);
      } else router.replace("/admin");
    });
    return () => cancelAnimationFrame(frame);
  }, [router]);

  useEffect(() => {
    if (cameraState !== "active" || !videoRef.current) return;
    const Detector = (window as typeof window & { BarcodeDetector?: new () => { detect(source: HTMLVideoElement): Promise<Array<{ rawValue: string }>> } }).BarcodeDetector;
    if (!Detector) return;
    const detector = new Detector();
    let frame = 0;
    const scan = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) {
        frame = requestAnimationFrame(scan);
        return;
      }
      try {
        const results = await detector.detect(video);
        if (results[0]?.rawValue) {
          openVerification(results[0].rawValue);
          return;
        }
      } catch {
        setError("The camera could not read this code. Try again or enter the participant ID below.");
      }
      frame = requestAnimationFrame(scan);
    };
    frame = requestAnimationFrame(scan);
    return () => cancelAnimationFrame(frame);
  }, [cameraState, openVerification]);

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);

  async function startCamera() {
    setError("");
    setCameraState("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState("active");
    } catch {
      setCameraState("idle");
      setError("Camera permission was denied or unavailable. Enter the participant ID manually to continue.");
    }
  }

  function handleManualSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    openVerification(identifier);
  }

  if (!role) return <main className="verify-shell"><p className="mono">VERIFYING STAFF ACCESS...</p></main>;

  return (
    <main className="verify-shell">
      <header className="verify-nav"><Link href={role === "Admin" ? "/admin" : "/judge"} className="wordmark"><span className="wordmark-mark">N</span><span><strong>NEXORA</strong><small>2026</small></span></Link><span className="staff-badge">{role} VERIFIED</span></header>
      <div className="verify-wrap">
        <header className="verify-heading"><div><span className="eyebrow">{role.toUpperCase()} / PARTICIPANT VERIFICATION</span><h1>Scan a <span>passport.</span></h1><p>Identify the participant from the QR record, then review their live hackathon progress.</p></div><Link href="/verify" className="button button-outline">ENTER ID</Link></header>
        <section className="scanner-grid">
          <article className="scanner-card">
            <div className="scanner-frame">{cameraState === "active" ? <video ref={videoRef} playsInline muted aria-label="Participant QR scanner" /> : <div className="scanner-placeholder"><strong>READY TO SCAN</strong><span>Allow camera access to identify a participant.</span></div>}</div>
            <div className="scanner-actions"><button type="button" className="button button-black" onClick={startCamera} disabled={cameraState === "starting"}>{cameraState === "starting" ? "OPENING CAMERA..." : "OPEN CAMERA"}</button><span className="mono">AUTHORIZED {role.toUpperCase()} ACCESS</span></div>
          </article>
          <article className="scanner-card scanner-manual"><span className="eyebrow">MANUAL FALLBACK</span><h2>Use the participant ID</h2><p>Enter the ID printed on the participant passport when camera scanning is unavailable.</p><form onSubmit={handleManualSubmit}><label htmlFor="participant-id">Participant / Hackathon ID</label><input id="participant-id" value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="SH26-P-001" /><button className="button button-orange" type="submit">OPEN VERIFICATION <span>↗</span></button></form>{error && <p className="verify-error" role="alert">{error}</p>}</article>
        </section>
      </div>
    </main>
  );
}
