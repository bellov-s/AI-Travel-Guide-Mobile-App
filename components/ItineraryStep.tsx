// components/ItineraryStep.tsx
"use client";

import TtsSpeak from "./TtsSpeak";

type ItineraryStepProps = {
  order: number;
  name: string;
  note: string;
  address?: string;
  time?: string;
};

export function ItineraryStep({ order, name, note, address, time }: ItineraryStepProps) {
  const tts = `${name}. ${note}`;

  return (
    <div className="rounded-[--radius] border bg-card text-card-foreground p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">{time ?? ""}</div>
          <div className="font-medium">{order}. {name}</div>
        </div>
        <TtsSpeak text={tts} />
      </div>
      <div className="text-sm mt-2">{note}</div>
      {address ? (
        <div className="text-xs text-muted-foreground mt-1">{address}</div>
      ) : null}
    </div>
  );
}
