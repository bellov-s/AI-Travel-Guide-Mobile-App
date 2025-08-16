// app/route/page.tsx
import type { ReactNode } from "react";

type Params = {
  city?: string;
  theme?: string;
  duration?: string;
  persona?: string;
};

async function getItinerary(searchParams: Params) {
  // Only include string values, skip undefined or non-string
  const cleanParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string" && value !== "undefined") {
      cleanParams[key] = value;
    }
  }
  const qs = new URLSearchParams(cleanParams).toString();
  // Always use an absolute URL for server components
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl.replace(/\/$/, "")}/api/itinerary?${qs}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load itinerary");
  return res.json();
}

export default async function RoutePage({
  searchParams,
}: {
  searchParams: Params;
}): Promise<ReactNode> {
  const data = await getItinerary(searchParams);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground p-6 space-y-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">
          {data.title}
        </h1>
        <span className="text-sm text-muted-foreground">
          {data.meta}
        </span>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {data.stops.map((s: any, i: number) => (
            <div key={i} className="card border">
              <div className="text-sm text-muted-foreground">{s.time}</div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm mt-1">{s.note}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.address}</div>
            </div>
          ))}
        </div>
        <aside className="space-y-4">
          <div className="card border">
            <h2 className="font-medium mb-2">Tips</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {data.tips.map((t: string, i: number) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <div className="card border">
            <h2 className="font-medium mb-2">Restaurants</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {data.food.map((t: string, i: number) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
