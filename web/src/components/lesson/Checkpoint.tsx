import { Check } from "lucide-react";

type CheckpointProps = {
  items: string[];
};

export function Checkpoint({ items }: CheckpointProps) {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
      <h3 className="text-base font-bold text-amber-950">Checkpoint</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-amber-950">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
