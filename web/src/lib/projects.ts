import { courseModules } from "./courses";

const projectCommands: Record<string, string[]> = {
  m0: ["cd python", "uv run pytest tests/test_metrics.py"],
  m1: ["cd python", "uv run python examples/run_buy_and_hold.py"],
  m2: ["cd python", "uv run pytest tests/test_metrics.py"],
  m3: ["cd python", "uv run pytest tests/test_metrics.py"],
  m4: ["cd python", "uv run pytest tests/test_positions.py tests/test_costs.py"],
  m5: ["cd python", "uv run python examples/run_buy_and_hold.py"],
  m6: ["cd python", "uv run python examples/run_moving_average.py"],
  m7: ["cd python", "uv run pytest tests/test_portfolio.py", "uv run python examples/run_equal_weight_portfolio.py"],
  m8: ["cd python", "uv run python examples/run_parameter_scan.py"],
  m9: ["cd python", "uv run python examples/generate_capstone_template.py"],
};

export const miniProjects = courseModules.map((module, index) => ({
  id: `project-${index}`,
  moduleId: module.id,
  moduleTitle: module.title,
  title: module.miniProject.title,
  deliverable: module.miniProject.deliverable,
  checks: module.miniProject.checks,
  commands: projectCommands[module.id] ?? ["cd python", "uv run pytest"],
  lessons: module.lessons,
}));
