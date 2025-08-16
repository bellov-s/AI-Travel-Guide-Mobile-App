// app/itinerary/page.tsx
import ItineraryMapWrapper from "@/components/ItineraryMapWrapper";
import ItineraryListClient from "@/components/ItineraryListClient";
import { headers } from "next/headers";

type SP = { [k: string]: string | string[] | undefined };

function pick(v?: string | string[]) {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

function qsFromSP(sp: SP) {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") u.set(k, v);
    else if (Array.isArray(v) && v[0]) u.set(k, v[0]);
  }
  return u.toString();
}


export default async function ItineraryPage({ searchParams }: { searchParams: SP }) {
  // 👉 В Next 15 динамические API нужно "await"
  const params = await searchParams;
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const base = `${proto}://${host}`;

  const qs = qsFromSP(params);
  const url = qs ? `${base}/api/itinerary?${qs}` : `${base}/api/itinerary`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load itinerary: ${res.status}`);
  const data = await res.json();

  return (
    <div className="min-h-[100dvh] bg-background text-foreground p-6 space-y-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <span className="text-sm text-muted-foreground">{data.meta}</span>
      </header>

  <ItineraryMapWrapper stops={data.stops} />

      <ItineraryListClient stops={data.stops} />
    </div>
  );
}
