// components/ItineraryStep.tsx
"use client";

import TtsSpeak from "./TtsSpeak";
import { MapPin, Clock, Navigation, Star } from "lucide-react";

type ItineraryStepProps = {
  order: number;
  name: string;
  note: string;
  address?: string;
  time?: string;          // время посещения
  distance?: string;      // например "1.2 km"
  rating?: number;        // 0..5
  onDetails?: () => void; // клик по кнопке Details (опционально)
  onNavigate?: () => void; // клик "Navigate" (опционально)
};

export default function ItineraryStep({
  order,
  name,
  note,
  address,
  time,
  distance,
  rating,
  onDetails,
  onNavigate,
}: ItineraryStepProps) {
  const tts = `${name}. ${note}`;

  return (
    <article
      className="card hover:shadow-md transition-shadow"
      aria-label={`Stop ${order}: ${name}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Counter */}
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
            {order}
          </span>

          <div>
            {/* Название точки */}
            <h3 className="text-base font-semibold leading-tight">{name}</h3>

            {/* Метаданные: время / адрес / дистанция / рейтинг */}
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {time && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {time}
                </span>
              )}

              {address && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {address}
                </span>
              )}

              {distance && <span>{distance}</span>}

              {typeof rating === "number" && (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  {rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Кнопка озвучки */}
        <TtsSpeak text={tts} />
      </div>

      {/* Body */}
      <div className="mt-3 text-sm leading-relaxed">{note}</div>

      {/* Footer actions */}
      {(onDetails || onNavigate) && (
        <div className="mt-4 flex items-center justify-end gap-2">
          {onDetails && (
            <button
              type="button"
              onClick={onDetails}
              className="px-3 py-1.5 text-xs rounded-md border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Details
            </button>
          )}

          {onNavigate && (
            <button
              type="button"
              onClick={onNavigate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Navigation className="h-3.5 w-3.5" />
              Navigate
            </button>
          )}
        </div>
      )}
    </article>
  );
}
