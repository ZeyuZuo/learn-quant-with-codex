import { AlertCircle, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";
import { CopyButton } from "@/components/prompt/CopyButton";

type MistakeClinicProps = {
  mistakes: string[];
};

export function MistakeClinic({ mistakes }: MistakeClinicProps) {
  const reviewTemplate = [
    "# 误区诊断复盘",
    "",
    "本节我最需要防住的误区：",
    ...mistakes.map((mistake) => `- ${mistake}`),
    "",
    "我会怎样防住它：",
    "- ",
    "",
    "我留下的证据：",
    "- 代码 / 测试 / 图表 / 报告片段：",
    "",
    "我不会这样表述：",
    "- ",
    "",
  ].join("\n");

  return (
    <section className="rounded-lg border border-rose-200 bg-rose-50/80 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-rose-100 text-rose-700">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-rose-950">误区诊断</h3>
            <p className="mt-1 text-sm leading-7 text-rose-950">
              量化学习里，很多错误不会让代码报错，只会让回测结果变得更好看。先把这些坑写出来，再进入 Codex 任务。
            </p>
          </div>
        </div>
        <CopyButton value={reviewTemplate} label="复制误区复盘" className="border-rose-200 bg-white px-3 py-2 text-xs text-rose-950 hover:border-rose-300" />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_260px]">
        <div className="grid gap-2">
          {mistakes.map((mistake, index) => (
            <div key={mistake} className="mistake-card flex gap-3 rounded-md border border-rose-100 bg-white px-3 py-3 text-sm leading-6 text-slate-800" style={{ animationDelay: `${index * 55}ms` }}>
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-50 text-xs font-black text-rose-700">{index + 1}</div>
              <div>
                <div className="flex items-center gap-2 font-black text-rose-950">
                  <CheckCircle2 className="h-4 w-4 text-rose-600" />
                  需要防住
                </div>
                <p className="mt-1 text-slate-700">{mistake}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-md border border-rose-100 bg-white p-4 text-rose-950">
          <div className="flex items-center gap-2 text-sm font-black">
            <ShieldCheck className="h-4 w-4" />
            防线写法
          </div>
          <div className="mt-3 grid gap-3 text-sm leading-6">
            <div>
              <div className="font-black">1. 先说为什么错</div>
              <p className="mt-1 text-slate-700">把误区和数据、收益、仓位、成本或验证偏差连起来。</p>
            </div>
            <div>
              <div className="font-black">2. 再说怎样防</div>
              <p className="mt-1 text-slate-700">写测试、看图表、跑命令，或在报告里明确限制。</p>
            </div>
            <div>
              <div className="font-black">3. 留下证据</div>
              <p className="mt-1 text-slate-700">把证据写进本节笔记、Mini Project 或 Capstone。</p>
            </div>
          </div>
          <div className="mt-4 rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-semibold leading-5">
            <span className="inline-flex items-center gap-1 font-black">
              <ClipboardList className="h-3.5 w-3.5" />
              复盘目标
            </span>
            <span className="mt-1 block">能解释一个错误为什么会让结果更乐观，而不是只背误区名称。</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
