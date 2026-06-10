import zhData from "../../content/courses/zh.json";
import { CourseHomePage } from "../../src/next-components/pages";

export const metadata = {
  title: zhData.home.title,
  description: zhData.home.description
};

export default function Page() {
  return <CourseHomePage locale="zh" />;
}
