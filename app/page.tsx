// app/page.tsx
import type { ReactNode } from "react";

// Важно: проверь, default это экспорт или именованный.
// Если именованный: import { MainScreen } from "@/components/MainScreen";
import MainScreen from "@/components/MainScreen";

export default function Home(): ReactNode {
  return (
    // Подхватываем токены из @theme (а не жёсткий белый фон)
    <div className="min-h-[100dvh] bg-background text-foreground">
      <MainScreen />
    </div>
  );
}
