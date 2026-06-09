import Link from "next/link";
import { ArrowRight, DoorOpen, Flag, Milestone, Repeat, Target } from "lucide-react";
import { getSkillLine } from "@/lib/courses";
import type { CourseModule } from "@/lib/types";

type LessonModuleGateProps = {
  courseModule?: CourseModule;
};

export function LessonModuleGate({ courseModule }: LessonModuleGateProps) {
  if (!courseModule) {
    return null;
  }

  const skillLines = courseModule.skillLines.map((skillLineId) => getSkillLine(skillLineId)).filter((skillLine) => skillLine !== undefined);
  const gateItems = [
    {
      icon: DoorOpen,
      label: "进入前",
      body: courseModule.gate.entry,
      tone: "border-slate-200 bg-slate-50 text-slate-800",
    },
    {
      icon: Target,
      label: "完成后",
      body: courseModule.gate.exit,
      tone: "border-teal-200 bg-teal-50 text-teal-950",
    },
    {
      icon: Repeat,
      label: "下一步复用",
      body: courseModule.gate.nextUse,
      tone: "border-indigo-100 bg-indigo-50 text-indigo-950",
    },
  ];

  return (
    <section id="module-gate" className="chart-enter scroll-mt-24 mt-8 rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-accent">Module Gate</p>
          <h2 className="mt-1 text-lg font-black text-ink">{courseModule.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{courseModule.summary}</p>
        </div>
        <Link href={`/projects#${courseModule.id}`} className="inline-flex items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
          项目验收
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {gateItems.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className={`rounded-lg border p-4 ${item.tone}`}>
              <div className="flex items-center gap-2 text-sm font-black">
                <Icon className="h-4 w-4" />
                {item.label}
              </div>
              <p className="mt-2 text-sm leading-6">{item.body}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-md border border-teal-200 bg-teal-50 p-3 text-teal-950">
          <div className="flex items-center gap-2 text-sm font-black">
            <Milestone className="h-4 w-4" />
            Mini Project 产物
          </div>
          <p className="mt-2 text-sm leading-6">{courseModule.miniProject.deliverable}</p>
        </div>
        <div className="rounded-md border border-line bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <Flag className="h-4 w-4 text-accent" />
            本模块训练的能力线
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skillLines.map((skillLine) => (
              <span key={skillLine.id} className="rounded-md border border-indigo-100 bg-white px-2 py-1 text-xs font-bold text-indigo-950">
                {skillLine.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
