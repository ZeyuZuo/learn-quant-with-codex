import Link from "next/link";
import { BookOpen, ClipboardList, FileText } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProjectRoadmap } from "@/components/projects/ProjectRoadmap";

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <header className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-950">
              <ClipboardList className="h-4 w-4" />
              模块验收入口
            </div>
            <h1 className="text-3xl font-black text-ink sm:text-4xl">项目实践</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              每个模块都有一个 Mini Project。它们把课程里的概念、Python 函数、测试和报告串起来，最后收束到 Capstone 研究报告。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/courses" className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700">
                <BookOpen className="h-4 w-4" />
                返回课程目录
              </Link>
              <Link href="/capstone" className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
                <FileText className="h-4 w-4" />
                查看 Capstone
              </Link>
            </div>
          </div>
          <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <h2 className="text-base font-black">项目页怎么用</h2>
            <p className="mt-3 text-sm leading-7">
              先按课程顺序完成模块，再回到这里勾选验收项。每个项目都要求你留下交付物、运行命令、反思问题和可写入最终报告的材料。
            </p>
          </aside>
        </header>

        <ProjectRoadmap />
      </main>
    </>
  );
}
