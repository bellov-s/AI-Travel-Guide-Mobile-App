// app/layout.tsx
import "../styles/globals.css";
import type { ReactNode } from "react";           // ✅ добавили тип
import type { Metadata } from "next";              // (не обязателен, но полезен)

export const metadata: Metadata = {
  title: "AI Travel Guide",
  description: "MVP UI from Figma export",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-[100dvh] bg-white text-neutral-800">
        {children}
      </body>
    </html>
  );
}
