import "../../src/styles/main.css";
import enData from "../../content/courses/en.json";

const icon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23277c6a'/%3E%3Cpath d='M8 21h16v3H8zm2-4 4-4 3 3 6-8 2 2-8 11-3-3-3 3z' fill='white'/%3E%3C/svg%3E";

export const metadata = {
  title: {
    default: `${enData.home.title} | ${enData.site.projectName}`,
    template: `%s | ${enData.site.projectName}`
  },
  description: enData.home.description,
  icons: {
    icon
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
