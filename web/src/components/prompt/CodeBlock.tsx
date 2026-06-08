import { CopyButton } from "./CopyButton";

type CodeBlockProps = {
  code: string;
  language?: string;
};

export function CodeBlock({ code, language = "python" }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">{language}</span>
        <CopyButton
          value={code}
          label="复制代码"
          className="border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-100 hover:border-teal-400 hover:text-teal-200"
        />
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
