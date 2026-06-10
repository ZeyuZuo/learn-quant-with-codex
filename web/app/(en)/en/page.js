import enData from "../../../content/courses/en.json";
import { CourseHomePage } from "../../../src/next-components/pages";

export const metadata = {
  title: enData.home.title,
  description: enData.home.description
};

export default function Page() {
  return <CourseHomePage locale="en" />;
}
