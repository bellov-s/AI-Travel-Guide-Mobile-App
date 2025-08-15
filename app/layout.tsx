// app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Travel Guide",
  description: "MVP UI from Figma export",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // suppressHydrationWarning — чтобы не ругаться на возможные мелкие расхождения внизу дерева
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-[#333]">
        {children}
      </body>
    </html>
  );
}
