import Link from "next/link";
import { BookOpen, FlaskConical, Github } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 font-bold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-sm text-white">Q</span>
          <span className="hidden sm:inline">learn-quant-with-codex</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium text-slate-700">
          <Link href="/courses" className="inline-flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-slate-100">
            <BookOpen className="h-4 w-4" />
            课程
          </Link>
          <Link href="/labs/metrics" className="inline-flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-slate-100">
            <FlaskConical className="h-4 w-4" />
            实验
          </Link>
          <a
            href="https://github.com/ZeyuZuo/learn-quant-with-codex"
            className="hidden items-center gap-2 rounded-md px-3 py-2 transition hover:bg-slate-100 sm:inline-flex"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
