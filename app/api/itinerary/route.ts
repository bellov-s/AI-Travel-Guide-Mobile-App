// app/api/itinerary/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city") ?? "Larnaca";
  const theme = url.searchParams.get("theme") ?? "history";
  const duration = url.searchParams.get("duration") ?? "halfday";
  const persona = url.searchParams.get("persona") ?? "local";

  const title = `${city[0].toUpperCase() + city.slice(1)} — ${theme} (${duration})`;
  const meta = `Guide: ${persona}`;

  // простой мок — потом подменим вызовом ИИ/поиска
  const stops = [
    { time: "10:00", name: "Saint Lazarus Church", address: "Plateia Agiou Lazarou", note: "Iconic 9th-century church." },
    { time: "11:00", name: "Old Larnaka Wine Bar", address: "Zenon Kitieos 12", note: "Local varieties; ask for Commandaria." },
    { time: "12:00", name: "Finikoudes Promenade", address: "Athenon Ave", note: "Seaside walk and coffee." },
  ];

  const tips = [
    "Buy tickets online to skip lines.",
    "Carry water and hat (sun!).",
    "Ask locals for seasonal events.",
  ];

  const food = [
    "To Kafe Tis Chrysanthis — brunch",
    "Stou Rousia — meze",
    "Ammos Beach Bar — sunset drinks",
  ];

  return NextResponse.json({ title, meta, stops, tips, food }, { status: 200 });
}
