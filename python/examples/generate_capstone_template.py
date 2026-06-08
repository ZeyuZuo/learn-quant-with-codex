from pathlib import Path

from quant_learning.reports import save_capstone_template, validate_capstone_report


def main() -> None:
    output_path = Path(__file__).resolve().parents[2] / "reports" / "final_research_report.md"
    save_capstone_template(output_path)
    result = validate_capstone_report(output_path.read_text(encoding="utf-8"))
    print({"path": str(output_path), **result})


if __name__ == "__main__":
    main()
