"use client";
// app/route/page.tsx

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as R from "@/components/RouteScreen";
const RouteScreen = (R as any).default ?? (R as any).RouteScreen;


export default function RoutePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const city = searchParams.get("city") || "";
  const theme = searchParams.get("theme") || "";
  const duration = searchParams.get("duration") || "";
  const persona = searchParams.get("persona") || "";

  const routeData = city && theme && duration && persona
    ? { city, theme, duration, persona }
    : undefined;

  const handleApproachPOI = () => {};
  const handleMenu = () => {
    router.push("/");
  };
  const handleEndTour = () => {
    router.push("/");
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      {RouteScreen ? (
        <RouteScreen
          routeData={routeData}
          onApproachPOI={handleApproachPOI}
          onMenu={handleMenu}
          onEndTour={handleEndTour}
        />
      ) : null}
    </div>
  );
}
