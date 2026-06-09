"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ClipboardCheck, FileWarning, RotateCcw } from "lucide-react";

const checklist = [
  { id: "boundary", label: "项目边界和非投资建议声明", group: "边界" },
  { id: "data", label: "数据范围、ticker、日期区间和质量报告", group: "数据" },
  { id: "adjusted", label: "说明选择 Close 或 Adjusted Close 的原因", group: "数据" },
  { id: "strategy", label: "策略假设、signal 生成方式和失效场景", group: "策略" },
  { id: "position", label: "position 滞后规则和 look-ahead bias 检查", group: "回测" },
  { id: "costs", label: "手续费、滑点、换手和仓位假设", group: "回测" },
  { id: "benchmark", label: "buy and hold 或 SPY benchmark 对比", group: "基准" },
  { id: "charts", label: "净值曲线、回撤曲线和完整指标表", group: "图表" },
  { id: "parameters", label: "参数扫描和样本内最优参数说明", group: "验证" },
  { id: "oos", label: "样本内 / 样本外切分和样本外结果", group: "验证" },
  { id: "risks", label: "至少 5 条限制、偏差或风险", group: "风险" },
  { id: "tests", label: "记录 Python 测试通过结果", group: "复现" },
];

const STORAGE_KEY = "learn-quant-with-codex.capstone-checklist.v1";

function readCompletedItems() {
  if (typeof window === "undefined") {
    return new Set<string>(["boundary"]);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return new Set<string>(["boundary"]);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return new Set<string>(["boundary"]);
    }
    return new Set(parsed.filter((item) => typeof item === "string"));
  } catch {
    return new Set<string>(["boundary"]);
  }
}

function writeCompletedItems(items: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...items]));
}

export function CapstoneChecklist() {
  const [completed, setCompleted] = useState<Set<string>>(new Set(["boundary"]));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompleted(readCompletedItems());
    setReady(true);
  }, []);

  const progress = useMemo(() => {
    const count = completed.size;
    const missing = checklist.filter((item) => !completed.has(item.id));
    const groups = [...new Set(checklist.map((item) => item.group))].map((group) => {
      const items = checklist.filter((item) => item.group === group);
      const done = items.filter((item) => completed.has(item.id)).length;
      return { group, done, total: items.length };
    });

    return {
      count,
      percent: Math.round((count / checklist.length) * 100),
      missing,
      groups,
      hasRiskStatement: completed.has("boundary") && completed.has("risks"),
      readyForReview: count === checklist.length,
      nextItem: missing[0],
    };
  }, [completed]);

  function toggle(id: string) {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      writeCompletedItems(next);
      return next;
    });
  }

  function resetChecklist() {
    const initial = new Set<string>(["boundary"]);
    writeCompletedItems(initial);
    setCompleted(initial);
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
            <ClipboardCheck className="h-5 w-5 text-accent" />
            Capstone 自查清单
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
            勾选报告里已经完成的部分。这个清单不替代 Python 校验脚本，但能帮助你在写报告时及时发现缺口。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-black text-teal-950">{ready ? `${progress.percent}% 完成` : "读取中"}</div>
          <button
            type="button"
            onClick={resetChecklist}
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
          >
            <RotateCcw className="h-4 w-4" />
            重置
          </button>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${ready ? progress.percent : 0}%` }} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {progress.groups.map((group) => {
          const done = group.done === group.total;
          return (
            <div key={group.group} className={`rounded-md border px-3 py-2 text-sm ${done ? "border-teal-200 bg-teal-50 text-teal-950" : "border-line bg-slate-50 text-slate-700"}`}>
              <div className="font-black">{group.group}</div>
              <div className="mt-1 text-xs opacity-80">
                {group.done}/{group.total}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {checklist.map((item) => {
          const checked = completed.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`flex min-h-16 items-start gap-3 rounded-lg border p-3 text-left transition ${
                checked ? "border-teal-200 bg-teal-50 text-teal-950" : "border-line bg-slate-50 text-slate-700 hover:border-accent"
              }`}
            >
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${checked ? "border-teal-600 bg-teal-600 text-white" : "border-slate-300 bg-white"}`}>
                {checked ? <CheckCircle2 className="h-4 w-4" /> : null}
              </span>
              <span>
                <span className="block text-xs font-black uppercase tracking-wide opacity-70">{item.group}</span>
                <span className="mt-1 block text-sm font-semibold leading-6">{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className={`rounded-md border p-4 ${progress.hasRiskStatement ? "border-teal-200 bg-teal-50 text-teal-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
          <div className="flex items-center gap-2 text-sm font-bold">
            {progress.hasRiskStatement ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            风险声明状态
          </div>
          <p className="mt-2 text-sm leading-7">
            {progress.hasRiskStatement ? "已包含项目边界和风险限制。仍需确保报告原文清楚写出“不构成投资建议”和“不代表未来收益”。" : "还需要同时完成项目边界声明和风险清单。"}
          </p>
        </div>

        <div className={`rounded-md border p-4 ${progress.readyForReview ? "border-teal-200 bg-teal-50 text-teal-950" : "border-rose-200 bg-rose-50 text-rose-950"}`}>
          <div className="flex items-center gap-2 text-sm font-bold">
            {progress.readyForReview ? <CheckCircle2 className="h-4 w-4" /> : <FileWarning className="h-4 w-4" />}
            下一步
          </div>
          <p className="mt-2 text-sm leading-7">
            {progress.readyForReview
              ? "清单已全部完成。下一步运行 Python 校验脚本并复查报告措辞。"
              : progress.nextItem
                ? `先补齐：${progress.nextItem.group} - ${progress.nextItem.label}。`
                : "继续检查报告缺口。"}
          </p>
        </div>
      </div>

      {progress.missing.length > 0 ? (
        <div className="mt-5 rounded-md border border-line bg-slate-50 p-4">
          <div className="text-sm font-black text-ink">未完成清单</div>
          <div className="mt-3 grid gap-2 lg:grid-cols-2">
            {progress.missing.map((item) => (
              <div key={item.id} className="rounded-md bg-white px-3 py-2 text-sm leading-6 text-slate-700">
                <span className="font-bold text-ink">{item.group}：</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
