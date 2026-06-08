import { AlertCircle, CheckCircle2 } from "lucide-react";

type MistakeClinicProps = {
  mistakes: string[];
};

export function MistakeClinic({ mistakes }: MistakeClinicProps) {
  return (
    <section className="rounded-lg border border-rose-200 bg-rose-50/80 p-5">
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

      <div className="mt-4 grid gap-2">
        {mistakes.map((mistake) => (
          <div key={mistake} className="flex gap-2 rounded-md border border-rose-100 bg-white px-3 py-2 text-sm leading-6 text-slate-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            <span>{mistake}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
