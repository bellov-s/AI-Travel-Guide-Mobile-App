import ChartClient from "@/components/ChartClient";

export default function ItineraryPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Larnaca: Wine-focused route</h1>
      <p className="text-sm text-gray-600">Duration: ~3h · Mode: walk</p>

      <div className="rounded-xl border p-4">
        <h2 className="mb-2 font-medium">Stops</h2>
        <ol className="list-decimal pl-5 text-sm leading-7">
          <li>Saint Lazarus Church</li>
          <li>Old Larnaka Wine Bar</li>
          <li>Zenon Kitieos Street</li>
        </ol>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="mb-2 font-medium">Crowd trend</h2>
        <ChartClient />
      </div>
    </div>
  );
}
