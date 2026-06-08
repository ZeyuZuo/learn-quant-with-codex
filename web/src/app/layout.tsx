import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "learn-quant-with-codex",
  description: "用 Codex 学习美股量化交易基础的交互式课程站。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
