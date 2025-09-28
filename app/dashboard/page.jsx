"use client";

import { useEffect, useState } from "react";
import StackVerifyDB from "@stackverify/db";

function Copy({ label, value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="relative">
        <input className="input pr-28" value={value} readOnly />
        <button
          className="btn btn-secondary absolute right-1 top-1 h-8 px-3 text-sm"
          onClick={() => { navigator.clipboard.writeText(value || ""); setCopied(true); setTimeout(()=>setCopied(false), 1200); }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [me, setMe] = useState(null);
  const [tables, setTables] = useState([]);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const t = localStorage.getItem("sv_token");
      if (!t) {
        window.location.href = "/login";
        return;
      }
      setToken(t);

      try {
        const db = new StackVerifyDB();
        db.token = t;

        const user = await db.me();
        setMe(user);

        const list = await db.listTables();
        setTables(list || []);
      } catch (e) {
        setError(e.message || "Failed to load data");
      }
    })();
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="card">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2">{error}</p>
          <a href="/login" className="btn btn-primary mt-6">Back to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="card">
        <h1 className="text-2xl font-black">🎉 Congratulations!</h1>
        <p className="mt-2 text-gray-700">
          You’ve successfully registered/logged in. Your personal schema is live and ready.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Copy label="Email" value={me?.email || localStorage.getItem("sv_email") || ""} />
          <Copy label="Schema" value={me?.schema || localStorage.getItem("sv_schema") || ""} />
          <Copy label="Token" value={token} />
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">Role</div>
            <input className="input" value={me?.role || "user"} readOnly />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-green-50 p-4 text-green-800">
          <b>Next step:</b> install the SDK and start building.
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold">Use the SDK</h2>
        <pre className="code overflow-auto mt-3">{`npm install @stackverify/db

import StackVerifyDB from "@stackverify/db";
const db = new StackVerifyDB();

// Use your credentials (or set db.token = "${token.slice(0, 12)}..."):
await db.login("${me?.email || "you@example.com"}", "YOUR_PASSWORD");

const tables = await db.listTables();
console.log(tables);`}</pre>

        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-amber-900">
          <b>Heads up:</b> Visual UI tools (query builder, table editor, dashboards)
          will be part of upcoming paid plans on <i>stackverify.site</i>.  
          The SDK remains free — query anything on your own.
        </div>

        <div className="mt-6 flex gap-3">
          <a href="https://www.npmjs.com/package/@stackverify/db" target="_blank" className="btn btn-primary">Open on npm</a>
          <button className="btn btn-secondary" onClick={() => { localStorage.clear(); window.location.href = "/"; }}>
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold">Your Tables</h2>
        {tables.length === 0 ? (
          <p className="mt-2 text-gray-600">No tables found yet. Create via SQL in your app using <code>db.query()</code>.</p>
        ) : (
          <ul className="mt-3 list-disc pl-6 text-gray-800">
            {tables.map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}