"use client";

export default function Landing() {
  return (
    <div className="space-y-24">
      {/* ✅ HERO SECTION */}
      <section className="grid gap-16 lg:grid-cols-2 items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 text-sm">
            <span className="badge">Open Source</span>
            <span className="text-gray-400">SDK-first</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            The Open Source Database you can start using in{" "}
            <span className="text-black">seconds.</span>
          </h1>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Register once. Instantly get your own schema. Use our JavaScript SDK to query,
            insert, and manage data. No servers. No drivers. No config. Just ship.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/register" className="btn btn-primary">
              Get Started
            </a>
            <a href="/login" className="btn btn-secondary">
              I already have an account
            </a>
          </div>

          <div className="mt-8">
            <pre className="code overflow-auto rounded-xl">
{`# Install the SDK
npm install @stackverify/db

# Use it
import StackVerifyDB from "@stackverify/db";
const db = new StackVerifyDB();
await db.login("you@example.com", "your-password");
const tables = await db.listTables();`}
            </pre>
          </div>
        </div>

        {/* ✅ SIDE CARD */}
        <div className="card space-y-4">
          <h3 className="text-xl font-bold">Why StackVerify?</h3>
          <ul className="space-y-3 text-gray-700">
            <li>• <b>SDK-first:</b> build with code, not clicks.</li>
            <li>• <b>Instant setup:</b> your schema is ready after registration.</li>
            <li>• <b>No config:</b> auth + headers handled internally.</li>
            <li>• <b>Modern stack:</b> Next.js + Tailwind, clean API.</li>
            <li>• <b>Free to query:</b> paid UI tools coming soon on <i>stackverify.site</i>.</li>
          </ul>

          <div className="mt-6 rounded-xl bg-black/5 p-4 text-gray-800">
            <b>Heads up:</b> Visual dashboards (query builder, table editor) will be part of upcoming paid plans.
            For now, the SDK gives you full power — free.
          </div>
        </div>
      </section>

      {/* ✅ FEATURES GRID */}
      <section className="space-y-10">
        <h2 className="text-2xl font-bold tracking-tight">Built for Developers</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Simple Auth", "Login once — token managed internally."],
            ["Typed by Design", "Clean, predictable responses you can trust."],
            ["Works Anywhere", "Node & frontend friendly — fetch based."],
            ["Secure by Default", "Per-schema isolation; JWT backed."],
            ["Fast Onboarding", "Register → get schema → build."],
            ["Modern Tooling", "Next.js, Tailwind, Vercel-ready."]
          ].map(([title, desc]) => (
            <div key={title} className="card">
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="mt-1 text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}