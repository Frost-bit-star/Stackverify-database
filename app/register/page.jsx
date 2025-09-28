"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("error"); // "error" or "success"

  const onRegister = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMsg("");

    try {
      // 1) Register
      const r = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const reg = await r.json();
      if (!r.ok) throw new Error(reg?.error || "Registration failed");

      // 2) Login
      const l = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const log = await l.json();
      if (!l.ok) throw new Error(log?.error || "Login failed");

      // ✅ Save credentials
      localStorage.setItem("sv_email", email);
      localStorage.setItem("sv_schema", reg?.schema || "");
      localStorage.setItem("sv_token", log?.token);

      setMsgType("success");
      setMsg("Registration successful! Redirecting…");
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-gray-600">
            Get your personal schema instantly and start building with the SDK.
          </p>
        </header>

        <form onSubmit={onRegister} className="space-y-4">
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
            {busy ? "Processing…" : "Register"}
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
          Already registered?{" "}
          <a href="/login" className="text-brand-700 hover:underline">
            Log in instead
          </a>
          .
        </p>
      </div>
    </div>
  );
}