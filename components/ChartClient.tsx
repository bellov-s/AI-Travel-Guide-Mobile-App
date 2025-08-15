"use client";

import dynamic from "next/dynamic";
import React from "react";

// Подхватывает default- или named-экспорт из "@/components/ui/chart"
const InnerChart = dynamic(
  () => import("@/components/ui/chart").then((m: any) => m.default ?? m.Chart ?? (() => <div />)),
  {
    ssr: false,
    loading: () => <div className="h-48 rounded-lg animate-pulse bg-gray-100" />,
  }
);

export default function ChartClient(props: Record<string, any>) {
  return <InnerChart {...props} />;
}
