export default function Landing() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <div className="mb-4 inline-flex items-center gap-2 text-sm">
            <span className="badge">Open Source</span>
            <span className="text-gray-400">SDK-first</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            The Open Source Database you can start using in <span className="text-brand-600">seconds</span>.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Register once. Instantly get your own schema. Use our JavaScript SDK to query, insert, and manage data.
            No servers. No drivers. No config. Just ship.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="/register" className="btn btn-primary">Get Started</a>
            <a href="/login" className="btn btn-secondary">I already have an account</a>
          </div>
          <div className="mt-6">
            <pre className="code overflow-auto">
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

        {/* RIGHT CARD */}
        <div className="card">
          <h3 className="mb-3 text-xl font-bold">Why StackVerify?</h3>
          <ul className="space-y-3 text-gray-700">
            <li>• <b>SDK-first:</b> build with code, not clicks.</li>
            <li>• <b>Instant setup:</b> your schema is ready after registration.</li>
            <li>• <b>No config:</b> auth + headers handled internally.</li>
            <li>• <b>Modern stack:</b> Next.js + Tailwind, clean API.</li>
            <li>• <b>Free to query:</b> paid UI tools coming soon on <i>stackverify.site</i>.</li>
          </ul>

          <div className="mt-6 rounded-xl bg-brand-50 p-4 text-brand-900">
            <b>Heads up:</b> Visual dashboards (query builder, table editor) will be part of upcoming paid plans.
            For now, the SDK gives you full power — free.
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="mt-1 text-gray-600">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}