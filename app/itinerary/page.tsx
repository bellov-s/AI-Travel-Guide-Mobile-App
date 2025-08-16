// app/itinerary/page.tsx
import { ItineraryStep } from "@/components/ItineraryStep";

type SearchParams = {
  city?: string;
  theme?: string;
  duration?: string;
  persona?: string;
};

export default async function ItineraryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const city = (searchParams.city ?? "larnaca").toString();
  const theme = (searchParams.theme ?? "history").toString();
  const duration = (searchParams.duration ?? "halfday").toString();
  const persona = (searchParams.persona ?? "local").toString();

  // MOCK-данные — позже заменим на /api/itinerary
  const title = `${city.charAt(0).toUpperCase() + city.slice(1)} — ${theme} (${duration})`;
  const meta = `Guide: ${persona}`;

  const stops = [
    { time: "10:00", name: "Saint Lazarus Church", address: "Plateia Agiou Lazarou", note: "Iconic 9th-century church." },
    { time: "11:00", name: "Old Larnaka Wine Bar", address: "Zenon Kitieos 12", note: "Local varieties; try Commandaria." },
    { time: "12:00", name: "Finikoudes Promenade", address: "Athenon Ave", note: "Seaside walk and coffee spot." },
  ];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground p-6 space-y-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <span className="text-sm text-muted-foreground">{meta}</span>
      </header>

      {/* placeholder карты — позже подключим Map SDK */}
      <div className="h-64 rounded-[--radius] border bg-muted flex items-center justify-center text-sm text-muted-foreground">
        Map placeholder
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {stops.map((s, i) => (
          <ItineraryStep
            key={i}
            order={i + 1}
            name={s.name}
            note={s.note}
            address={s.address}
            time={s.time}
          />
        ))}
      </section>
    </div>
  );
}
