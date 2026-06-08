import { courseModules } from "@/lib/courses";
import { SidebarProgressMarks } from "./SidebarProgressMarks";

type CourseSidebarProps = {
  activeSlug?: string;
};

export function CourseSidebar({ activeSlug }: CourseSidebarProps) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-line bg-white/70 lg:block">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
        <div className="mb-4 text-xs font-bold uppercase tracking-wide text-muted">课程导航</div>
        <div className="grid gap-5">
          {courseModules.map((module) => (
            <section key={module.id}>
              <h3 className="mb-2 text-sm font-bold text-ink">{module.title}</h3>
              {module.lessons.length > 0 ? (
                <div className="grid gap-1">
                  <SidebarProgressMarks lessons={module.lessons} activeSlug={activeSlug} />
                </div>
              ) : (
                <p className="rounded-md border border-dashed border-line px-3 py-2 text-xs leading-5 text-muted">
                  后续课程已规划
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
}
