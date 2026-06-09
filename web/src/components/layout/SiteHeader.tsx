import Link from "next/link";
import { BookOpen, FileText, FlaskConical, Github, NotebookPen, Search, SquareKanban } from "lucide-react";

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
          <Link href="/labs" className="inline-flex items-center gap-2 rounded-md px-3 py-2 transition hover:bg-slate-100">
            <FlaskConical className="h-4 w-4" />
            实验
          </Link>
          <Link href="/projects" className="hidden items-center gap-2 rounded-md px-3 py-2 transition hover:bg-slate-100 md:inline-flex">
            <SquareKanban className="h-4 w-4" />
            项目
          </Link>
          <Link href="/glossary" className="hidden items-center gap-2 rounded-md px-3 py-2 transition hover:bg-slate-100 md:inline-flex">
            <Search className="h-4 w-4" />
            术语
          </Link>
          <Link href="/notebook" className="hidden items-center gap-2 rounded-md px-3 py-2 transition hover:bg-slate-100 lg:inline-flex">
            <NotebookPen className="h-4 w-4" />
            笔记
          </Link>
          <Link href="/capstone" className="hidden items-center gap-2 rounded-md px-3 py-2 transition hover:bg-slate-100 sm:inline-flex">
            <FileText className="h-4 w-4" />
            Capstone
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
