// app/itinerary/page.tsx
import MapClient from "@/components/MapClient";
import ItineraryListClient from "@/components/ItineraryListClient";

type SP = { [k: string]: string | string[] | undefined };

function pick(v?: string | string[]) {
  return Array.isArray(v) ? v[0] : v ?? "";
}

function qsFromSP(sp: SP) {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") u.set(k, v);
    else if (Array.isArray(v) && v[0]) u.set(k, v[0] as string);
  }
  return u.toString();
}

async function getItinerary(searchParams: SP) {
  const qs = qsFromSP(searchParams);
  // Always use an absolute URL for server components
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = qs
    ? `${baseUrl.replace(/\/$/, "")}/api/itinerary?${qs}`
    : `${baseUrl.replace(/\/$/, "")}/api/itinerary`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load itinerary");
  return res.json();
}

export default async function ItineraryPage({ searchParams }: { searchParams: SP }) {
  const params = await searchParams;
  const data = await getItinerary(params);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground p-6 space-y-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <span className="text-sm text-muted-foreground">{data.meta}</span>
      </header>

      <MapClient />

      <ItineraryListClient stops={data.stops} />

      {/* Правый сайдбар можно добавить позже:
      <aside className="space-y-4">
        <div className="card">
          <h2 className="font-medium mb-2">Tips</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {data.tips.map((t: string, i: number) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </aside>
      */}
    </div>
  );
}
