"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("error"); // "error" or "success"

  const onLogin = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");

      // ✅ Store locally
      localStorage.setItem("sv_email", email);
      localStorage.setItem("sv_token", data?.token || "");

      setMsgType("success");
      setMsg("Login successful! Redirecting…");
      setTimeout(() => (window.location.href = "/dashboard"), 600);
    } catch (e) {
      setMsgType("error");
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-12">
      <div className="card space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-gray-600">Log in to access your schema and token.</p>
        </header>

        <form onSubmit={onLogin} className="space-y-4">
          <input
            className="input"
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary w-full"
          >
            {busy ? "Please wait…" : "Log in"}
          </button>

          {msg && (
            <div
              className={`rounded-xl p-3 text-sm ${
                msgType === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {msg}
            </div>
          )}
        </form>

        <p className="text-sm text-gray-600 text-center">
          New here?{" "}
          <a href="/register" className="text-brand-700 hover:underline">
            Create an account
          </a>
          .
        </p>
      </div>
    </div>
  );
}