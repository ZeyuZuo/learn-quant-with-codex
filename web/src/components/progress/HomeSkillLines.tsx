"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Route } from "lucide-react";
import { allLessons, skillLines } from "@/lib/courses";

export function HomeSkillLines() {
  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-950">
            <Route className="h-4 w-4" />
            v4.4 纵向能力线
          </div>
          <h2 className="mt-4 text-2xl font-black text-ink">不是只读完章节，而是训练 6 类能力</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
            每节课都会落到一条能力线：从数据审查到研究表达。最终 Capstone 需要证明这些能力都留下了可复查证据。
          </p>
        </div>
        <Link href="/capstone" className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
          查看 Capstone 验收
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {skillLines.map((skillLine, index) => {
          const count = allLessons.filter((lesson) => lesson.skillLine === skillLine.id).length;
          return (
            <article
              key={skillLine.id}
              className="chart-enter rounded-lg border border-line bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-white hover:shadow-soft"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-wide text-accent">{skillLine.shortTitle}</div>
                  <h3 className="mt-1 text-base font-black text-ink">{skillLine.title}</h3>
                </div>
                <span className="rounded-md border border-line bg-white px-2 py-1 text-xs font-bold text-muted">{count} 节课</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">{skillLine.description}</p>
              <div className="mt-3 flex gap-2 border-t border-line pt-3 text-xs font-semibold leading-5 text-teal-950">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{skillLine.capstoneEvidence}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
