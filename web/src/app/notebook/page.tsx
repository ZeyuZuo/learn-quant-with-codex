import { SiteHeader } from "@/components/layout/SiteHeader";
import { NotebookView } from "@/components/notebook/NotebookView";

export default function NotebookPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <header>
          <h1 className="text-3xl font-black text-ink sm:text-4xl">学习笔记</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-650">
            这里汇总你在每节课写下的本地笔记。它适合记录自己的理解、疑问和下一次要问 Codex 的任务。
          </p>
        </header>
        <NotebookView />
      </main>
    </>
  );
}
