
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const college = String(formData.get("college") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const password = String(formData.get("password") || "");
    const termsAccepted = formData.get("terms") === "on";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !college ||
      !phone ||
      !password ||
      !termsAccepted
    ) {
      setError(
        "Please complete all required fields and accept the hackathon terms."
      );
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const participantId = `SH-2026-${String(Date.now()).slice(-4)}`;

    const user = {
      firstName,
      lastName,
      email,
      college,
      phone,
      password,
      participantId,
    };

    localStorage.setItem("solutionHuntUser", JSON.stringify(user));

    setSuccess("Account created successfully! Redirecting to login...");

    setTimeout(() => {
      router.push("/login");
    }, 900);
  }

  return (
    <main className="register-page">
      <div className="register-glow glow-one"></div>
      <div className="register-glow glow-two"></div>

      <nav className="register-nav">
        <Link href="/" className="register-logo">
          SOLUTION<span>HUNT</span>
        </Link>

        <Link href="/" className="back-home">
          ← Back to Home
        </Link>
      </nav>

      <section className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="register-icon">⚡</div>

            <p className="register-label">SOLUTION HUNT 2026</p>

            <h1>
              Join the <span>Hunt.</span>
            </h1>

            <p className="register-subtitle">
              Create your participant account and start building the future.
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="register-first-name">First Name</label>

                <input
                  id="register-first-name"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-last-name">Last Name</label>

                <input
                  id="register-last-name"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email Address</label>

              <input
                id="register-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-college">
                College / Institution
              </label>

              <input
                id="register-college"
                name="college"
                type="text"
                placeholder="Enter your college name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-phone">Phone Number</label>

              <input
                id="register-phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>

              <div className="password-wrapper">
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="terms">
              <input name="terms" type="checkbox" required />

              <span>
                I agree to the hackathon rules and terms of participation.
              </span>
            </label>

            {error && (
              <p className="register-form-error" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="register-form-success" role="status">
                {success}
              </p>
            )}

            <button type="submit" className="register-submit">
              Create Account <span>→</span>
            </button>
          </form>

          <div className="login-link">
            Already have an account?
            <Link href="/login"> Login</Link>
          </div>
        </div>

        <div className="register-side">
          <p className="side-small">YOUR JOURNEY STARTS HERE</p>

          <h2>
            Build.
            <br />
            <span>Innovate.</span>
            <br />
            Hunt.
          </h2>

          <p>
            Join developers, designers, innovators and problem solvers
            competing to create the next big solution.
          </p>

          <div className="side-stats">
            <div>
              <strong>48H</strong>
              <span>Challenge</span>
            </div>

            <div>
              <strong>06</strong>
              <span>Problem Tracks</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Possibilities</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

