"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const onRegister = async () => {
    setBusy(true); setMsg("");
    try {
      // 1) Register (returns schema)
      const r = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      const reg = await r.json();
      if (!r.ok) throw new Error(reg?.error || "Registration failed");

      // 2) Login to get token
      const l = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      const log = await l.json();
      if (!l.ok) throw new Error(log?.error || "Login failed");

      // Save token & email to localStorage
      localStorage.setItem("sv_email", email);
      localStorage.setItem("sv_schema", reg?.schema || "");
      localStorage.setItem("sv_token", log?.token);

      setMsg("Registration successful! Redirecting…");
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
        <h1 className="mb-2 text-2xl font-bold">Create your account</h1>
        <p className="mb-6 text-gray-600">Register to instantly get your own schema and start building.</p>

        <div className="space-y-3">
          <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn btn-primary w-full" onClick={onRegister} disabled={busy}>
            {busy ? "Please wait…" : "Register"}
          </button>
          {msg && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{msg}</div>}
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Already have an account? <a className="text-brand-700 hover:underline" href="/login">Log in</a>.
        </p>
      </div>
    </div>
  );
}