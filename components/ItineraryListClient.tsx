// components/ItineraryListClient.tsx
"use client";

import ItineraryStep from "./ItineraryStep";

type Stop = {
  time?: string;
  name: string;
  address?: string;
  note: string;
  distance?: string;
  rating?: number;
};

export default function ItineraryListClient({ stops }: { stops: Stop[] }) {
  const openInMaps = (address?: string, name?: string) => {
    if (!address && !name) return;
    const q = encodeURIComponent(address ?? name ?? "");
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {stops.map((s, i) => (
        <ItineraryStep
          key={`${s.name}-${i}`}
          order={i + 1}
          name={s.name}
          note={s.note}
          address={s.address}
          time={s.time}
          distance={s.distance}
          rating={s.rating}
          onNavigate={() => openInMaps(s.address, s.name)}
        />
      ))}
    </section>
  );
}
