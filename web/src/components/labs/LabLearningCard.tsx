import Link from "next/link";
import { AlertTriangle, BookOpen, FileCode2, Target } from "lucide-react";

type RelatedLesson = {
  href: string;
  label: string;
};

type LabLearningCardProps = {
  title: string;
  focus: string;
  pythonModule: string;
  caution: string;
  lessons: RelatedLesson[];
};

export function LabLearningCard({ title, focus, pythonModule, caution, lessons }: LabLearningCardProps) {
  return (
    <section className="mt-8 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
        <div className="flex items-center gap-2 text-sm font-black text-ink">
          <Target className="h-4 w-4 text-accent" />
          {title}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-700">{focus}</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700">
          <FileCode2 className="h-3.5 w-3.5 text-accent" />
          {pythonModule}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
          <div className="flex items-center gap-2 text-sm font-black">
            <AlertTriangle className="h-4 w-4" />
            实验边界
          </div>
          <p className="mt-2 text-sm leading-6">{caution}</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <BookOpen className="h-4 w-4 text-accent" />
            相关课程
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {lessons.map((lesson) => (
              <Link key={lesson.href} href={lesson.href} className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700 transition hover:border-accent hover:text-accent">
                {lesson.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
