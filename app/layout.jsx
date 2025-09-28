export const metadata = {
  title: "StackVerify DB – Open Source Database, SDK-first",
  description: "Register in seconds. Use your database with the JavaScript SDK. No config, no servers."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2">
              {/* Simple logo glyph */}
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-brand-600 text-white">SV</div>
              <span className="text-lg font-bold tracking-tight">StackVerify DB</span>
              <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium text-black/70">Open Source</span>
            </a>
            <nav className="flex items-center gap-2">
              <a className="btn btn-secondary" href="https://github.com/stackverify/stackverify-db" target="_blank">GitHub</a>
              <a className="btn btn-primary" href="/login">Login</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="mt-20 border-t py-10 text-sm text-gray-500">
          <div className="mx-auto max-w-6xl px-4">
            <p>© {new Date().getFullYear()} StackVerify. Built for developers.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}