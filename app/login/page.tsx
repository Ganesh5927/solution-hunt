"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");

		const formData = new FormData(event.currentTarget);
		const email = String(formData.get("email") || "").trim();
		const password = String(formData.get("password") || "");

		if (!email || !password) {
			setError("Please enter your email and password.");
			return;
		}

		const savedAccount = localStorage.getItem("solutionHuntUser");

		if (!savedAccount) {
			setError("Account not found. Please register first.");
			return;
		}

		let account: { email?: string; password?: string };

		try {
			account = JSON.parse(savedAccount);
		} catch {
			setError("Account not found. Please register first.");
			return;
		}

		if (!account || account.email !== email || account.password !== password) {
			setError("Invalid email or password.");
			return;
		}

		localStorage.setItem("solutionHuntLoggedIn", "true");
		router.push("/dashboard");
	}

	return (
		<main className="login-page">
			<div className="login-glow login-glow-one" />
			<div className="login-glow login-glow-two" />

			<nav className="login-nav">
				<Link href="/" className="login-logo">
					SOLUTION<span>HUNT</span>
				</Link>

				<Link href="/" className="login-back-home">
					← Back to Home
				</Link>
			</nav>

			<section className="login-container">
				<div className="login-card">
					<div className="login-header">
						<div className="login-icon">⚡</div>

						<p className="login-label">SOLUTION HUNT 2026</p>

						<h1>
							Welcome <span>Back.</span>
						</h1>

						<p className="login-subtitle">
							Login to continue your hackathon journey.
						</p>
					</div>

					<form className="login-form" onSubmit={handleSubmit}>
						<div className="login-form-group">
							<label htmlFor="login-email">Email Address</label>
							<input
								id="login-email"
								name="email"
								type="email"
								placeholder="you@example.com"
							/>
						</div>

						<div className="login-form-group">
							<label htmlFor="login-password">Password</label>

							<div className="login-password-wrapper">
								<input
									id="login-password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
								/>

								<button
									type="button"
									className="login-password-toggle"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? "Hide" : "Show"}
								</button>
							</div>
						</div>

						{error && <p className="login-form-error" role="alert">{error}</p>}

						<div className="login-options">
							<label className="login-remember">
								<input type="checkbox" />
								<span>Remember me</span>
							</label>

							<a href="#" className="login-forgot">
								Forgot password?
							</a>
						</div>

						<button type="submit" className="login-submit">
							Login <span>→</span>
						</button>
					</form>

					<div className="login-register-link">
						Don&apos;t have an account?
						<Link href="/register"> Register</Link>
					</div>
				</div>

				<div className="login-side">
					<p className="login-side-small">READY TO HUNT?</p>

					<h2>
						Think.
						<br />
						<span>Build.</span>
						<br />
						Win.
					</h2>

					<p className="login-side-description">
						Return to the arena, pick up where you left off, and turn your
						boldest idea into a real-world solution.
					</p>

					<div className="login-stats">
						<div>
							<strong>48H</strong>
							<span>Challenge</span>
						</div>

						<div>
							<strong>06</strong>
							<span>Tracks</span>
						</div>

						<div>
							<strong>∞</strong>
							<span>Ideas</span>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
