import { SiteHeader } from "@/components/layout/SiteHeader";
import { LessonChart } from "@/components/charts/LessonChart";
import { ParameterPlayground } from "@/components/labs/ParameterPlayground";

export default function ParameterScanLabPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header>
          <h1 className="text-3xl font-black text-ink">参数实验室</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-650">
            参数扫描可以帮你观察策略是否稳定，也会暴露过拟合风险。历史最优参数不是未来收益承诺。
          </p>
        </header>
        <div className="mt-8">
          <ParameterPlayground />
        </div>
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-bold text-ink">双均线参数扫描</h2>
          <LessonChart kind="parameter-scan" />
        </section>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-white p-4">
            <h3 className="font-bold text-ink">跳过非法组合</h3>
            <p className="mt-2 text-sm leading-7 text-muted">fast_window 必须小于 slow_window，否则“快线”就失去含义。</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4">
            <h3 className="font-bold text-ink">时间序列不能随机打乱</h3>
            <p className="mt-2 text-sm leading-7 text-muted">样本内 / 样本外拆分应按日期顺序进行。</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4">
            <h3 className="font-bold text-ink">最好结果也可能只是噪声</h3>
            <p className="mt-2 text-sm leading-7 text-muted">尝试的参数越多，越容易挑到历史上的偶然赢家。</p>
          </div>
        </div>
      </main>
    </>
  );
}
