import React from "react";

// Example usage: if you place your Figma-exported UI under components/ui
// import { Badge } from "@/components/ui/badge";
export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">AI Travel Guide</h1>
      <p>Figma export + Next.js scaffold is running.</p>
      {/* <Badge>Ready</Badge> */}
    </main>
  );
}
