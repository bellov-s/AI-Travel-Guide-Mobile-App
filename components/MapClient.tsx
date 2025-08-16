// components/MapClient.tsx
"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression, LatLngBoundsExpression } from "leaflet";

// Починка иконок для Leaflet в бандлере (иначе пустые маркеры)
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

type Stop = {
  name: string;
  note?: string;
  address?: string;
  lat?: number;
  lng?: number;
  time?: string;
};

function FitBounds({ points }: { points: LatLngExpression[] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    if (points.length === 1) {
      map.setView(points[0], 15);
    } else {
      const b = L.latLngBounds(points as LatLngBoundsExpression);
      map.fitBounds(b, { padding: [30, 30] });
    }
  }, [map, points]);
  return null;
}

export default function MapClient({ stops }: { stops: Stop[] }) {
  const points = useMemo<LatLngExpression[]>(
    () => stops.filter(s => typeof s.lat === "number" && typeof s.lng === "number").map(s => [s.lat!, s.lng!] as LatLngExpression),
    [stops]
  );

  // Центр по умолчанию (если нет координат)
  const center: LatLngExpression = points[0] ?? [34.91293, 33.63533]; // Ларнака

  return (
    <div className="rounded-[--radius] border overflow-hidden">
      <MapContainer center={center} zoom={13} style={{ height: 320, width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.length > 0 && <FitBounds points={points} />}

        {stops.map((s, i) =>
          typeof s.lat === "number" && typeof s.lng === "number" ? (
            <Marker key={`${s.name}-${i}`} position={[s.lat, s.lng]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{s.name}</div>
                  {s.time && <div className="text-xs text-muted-foreground">{s.time}</div>}
                  {s.address && <div className="text-xs mt-1">{s.address}</div>}
                  {s.note && <div className="text-xs mt-1">{s.note}</div>}
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
