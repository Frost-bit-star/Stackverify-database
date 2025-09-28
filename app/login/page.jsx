"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const onLogin = async () => {
    setBusy(true); setMsg("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");

      localStorage.setItem("sv_email", email);
      localStorage.setItem("sv_token", data?.token || "");
      // schema will be fetched on dashboard via /me

      window.location.href = "/dashboard";
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="card">
        <h1 className="mb-2 text-2xl font-bold">Welcome back</h1>
        <p className="mb-6 text-gray-600">Log in to view your schema and token.</p>

        <div className="space-y-3">
          <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn btn-primary w-full" onClick={onLogin} disabled={busy}>
            {busy ? "Please wait…" : "Login"}
          </button>
          {msg && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{msg}</div>}
        </div>

        <p className="mt-6 text-sm text-gray-600">
          New here? <a className="text-brand-700 hover:underline" href="/register">Create an account</a>.
        </p>
      </div>
    </div>
  );
}