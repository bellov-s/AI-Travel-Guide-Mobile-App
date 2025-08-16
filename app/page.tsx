// app/page.tsx
import * as React from "react";

// Handle BOTH export styles:
// - export default function MainScreen(){...}
// - export function MainScreen(){...}
import * as MS from "@/components/MainScreen";
const MainScreen = (MS as any).default ?? (MS as any).MainScreen;

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      {/* If MainScreen is missing, render nothing to avoid crash */}
      {MainScreen ? <MainScreen /> : null}
    </div>
  );
}
