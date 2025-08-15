import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AI Travel Guide",
  description: "MVP UI from Figma export",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-[#333]">{children}</body>
    </html>
  );
}
