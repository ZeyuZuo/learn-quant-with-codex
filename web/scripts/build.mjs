import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CourseDetailPageBuilder } from "../src/builders/course-detail-page-builder.mjs";
import { CourseHomePageBuilder } from "../src/builders/course-home-page-builder.mjs";
import { courseHref, courseOutputPath } from "../src/lib/course-paths.mjs";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const distDir = path.join(rootDir, "dist");
const contentDir = path.join(rootDir, "content", "courses");

const pages = [
  { locale: "zh", source: "zh.json", output: "index.html" },
  { locale: "en", source: "en.json", output: path.join("en", "index.html") }
];

const languages = [
  { locale: "zh", label: "中文", href: "/" },
  { locale: "en", label: "English", href: "/en/" }
];

function getLanguages(currentIndex = null) {
  if (currentIndex === null) {
    return languages;
  }

  return [
    { locale: "zh", label: "中文", href: courseHref("zh", currentIndex) },
    { locale: "en", label: "English", href: courseHref("en", currentIndex) }
  ];
}

async function readJson(filePath) {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

export async function build({ log = true } = {}) {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(path.join(distDir, "assets"), { recursive: true });

  const css = await readFile(path.join(rootDir, "src", "styles", "main.css"), "utf8");
  await writeFile(path.join(distDir, "assets", "main.css"), css);

  for (const page of pages) {
    const data = await readJson(path.join(contentDir, page.source));
    const html = new CourseHomePageBuilder({
      data,
      currentLocale: page.locale,
      languages: getLanguages()
    })
      .withHero()
      .withCourseList()
      .build();

    const outputPath = path.join(distDir, page.output);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);

    for (const [index] of data.courses.entries()) {
      const detailHtml = new CourseDetailPageBuilder({
        data,
        currentLocale: page.locale,
        languages: getLanguages(index),
        currentIndex: index
      }).build();
      const detailOutputPath = path.join(distDir, courseOutputPath(page.locale, index));
      await mkdir(path.dirname(detailOutputPath), { recursive: true });
      await writeFile(detailOutputPath, detailHtml);
    }
  }
  if (log) {
    console.log("Built static site in web/dist");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await build();
}
