"use client";
import dynamic from "next/dynamic";
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export default function ItineraryMapWrapper({ stops }: { stops: any[] }) {
  return <MapClient stops={stops} />;
}
