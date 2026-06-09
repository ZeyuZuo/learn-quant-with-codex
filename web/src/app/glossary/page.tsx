import { Search } from "lucide-react";
import { GlossaryExplorer } from "@/components/glossary/GlossaryExplorer";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function GlossaryPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="text-3xl font-black text-ink sm:text-4xl">量化术语表</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              这里用初学者能读懂的方式解释课程高频术语。每个术语都链接到相关课程，方便从概念跳回实践。
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <Search className="h-4 w-4 text-accent" />
              使用方式
            </div>
            <p className="mt-2 text-sm leading-7 text-muted">
              在课程页点击概念标签即可跳到对应术语。术语表不是金融百科，只解释本项目需要的最小知识。
            </p>
          </div>
        </header>

        <GlossaryExplorer />
      </main>
    </>
  );
}
