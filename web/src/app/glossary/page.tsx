import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getRelatedLessons, glossaryTerms } from "@/lib/glossary";

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

        <section className="mt-8 grid gap-4">
          {glossaryTerms.map((term) => {
            const lessons = getRelatedLessons(term);
            return (
              <article key={term.id} id={term.id} className="scroll-mt-24 rounded-lg border border-line bg-white p-5 shadow-soft">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className="text-xl font-black text-ink">{term.term}</h2>
                  <span className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-semibold text-muted">{term.english}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">{term.summary}</p>
                <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-7 text-amber-950">
                  {term.whyItMatters}
                </div>
                {lessons.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lessons.map((lesson) => (
                      <Link
                        key={lesson.slug}
                        href={`/courses/${lesson.slug}`}
                        className="inline-flex items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-accent hover:text-accent"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        {lesson.id} {lesson.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}
