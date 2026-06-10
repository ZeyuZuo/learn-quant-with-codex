import "../../src/styles/main.css";
import zhData from "../../content/courses/zh.json";

const icon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23277c6a'/%3E%3Cpath d='M8 21h16v3H8zm2-4 4-4 3 3 6-8 2 2-8 11-3-3-3 3z' fill='white'/%3E%3C/svg%3E";

export const metadata = {
  title: {
    default: `${zhData.home.title} | ${zhData.site.projectName}`,
    template: `%s | ${zhData.site.projectName}`
  },
  description: zhData.home.description,
  icons: {
    icon
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
