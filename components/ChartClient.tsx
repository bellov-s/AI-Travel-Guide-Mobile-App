// components/ChartClient.tsx
"use client";
import dynamic from "next/dynamic";

const InnerChart = dynamic(
  () => import("@/components/ui/chart").then((m: any) => m.default ?? m.Chart ?? (() => <div />)),
  { ssr: false, loading: () => <div className="h-48 rounded-lg animate-pulse bg-gray-100" /> }
);

export default function ChartClient(props: Record<string, any>) {
  return <InnerChart {...props} />;
}
