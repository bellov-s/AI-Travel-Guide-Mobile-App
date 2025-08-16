// app/poi/page.tsx
"use client";
import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as P from "@/components/POIScreen";
const POIScreen = (P as any).default ?? (P as any).POIScreen;

export default function POIPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const poiId = Number(searchParams.get("poiId"));

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      {POIScreen && poiId ? (
        <POIScreen poiId={poiId} onBack={handleBack} />
      ) : null}
    </div>
  );
}
