import Link from "next/link";
import { findGlossaryTerm } from "@/lib/glossary";

type ConceptPillsProps = {
  concepts: string[];
};

export function ConceptPills({ concepts }: ConceptPillsProps) {
  return (
    <span className="inline-flex flex-wrap gap-2 align-middle">
      {concepts.map((concept) => {
        const term = findGlossaryTerm(concept);
        if (!term) {
          return (
            <code key={concept} className="rounded-md border border-line bg-slate-100 px-2 py-1 text-sm">
              {concept}
            </code>
          );
        }

        return (
          <Link
            key={concept}
            href={`/glossary#${term.id}`}
            className="rounded-md border border-teal-200 bg-teal-50 px-2 py-1 text-sm font-semibold text-teal-950 transition hover:border-accent hover:bg-white"
          >
            {concept}
          </Link>
        );
      })}
    </span>
  );
}
