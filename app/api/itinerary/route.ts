// app/api/itinerary/route.ts
import { NextResponse } from "next/server";

function cap(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city = (url.searchParams.get("city") ?? "larnaca").toLowerCase();
  const theme = (url.searchParams.get("theme") ?? "history").toLowerCase();
  const duration = (url.searchParams.get("duration") ?? "halfday").toLowerCase();
  const persona = (url.searchParams.get("persona") ?? "local").toLowerCase();

  // Координаты Ларнаки (примерные)
  const baseStops = [
    { time: "10:00", name: "Saint Lazarus Church", address: "Plateia Agiou Lazarou", note: "Iconic 9th-century church.", lat: 34.91293, lng: 33.63533 },
    { time: "11:00", name: "Old Larnaka Wine Bar", address: "Zenon Kitieos 12", note: "Local varieties; try Commandaria.", lat: 34.91574, lng: 33.63087 },
    { time: "12:00", name: "Finikoudes Promenade", address: "Athenon Ave", note: "Seaside walk and coffee spot.", lat: 34.91177, lng: 33.63963 },
  ];

  const wineExtra = [
    // Демонстрационный «доп. пункт» (условные координаты города/винодельни)
    { time: "12:40", name: "Ktima Dafermou (tasting)", address: "Lefkara road", note: "Boutique Cypriot wines tasting.", lat: 34.8825, lng: 33.2895 },
  ];

  const historyExtra = [
    { time: "12:40", name: "Larnaca Medieval Castle", address: "Athenon Ave 6", note: "Small fortress & museum by the sea.", lat: 34.91054, lng: 33.64042 },
  ];

  const stops =
    theme === "wine" ? [...baseStops, ...wineExtra]
    : theme === "history" ? [...baseStops, ...historyExtra]
    : baseStops;

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

  return NextResponse.json({
    title: `${cap(city)} — ${theme} (${duration})`,
    meta: `Guide: ${persona}`,
    city, theme, duration, persona,
    stops,
    tips,
    food,
  });
}
