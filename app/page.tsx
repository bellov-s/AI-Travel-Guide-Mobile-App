import React from "react";
import Sidebar from "@/components/ui/sidebar";
import ChartClient from "../components/ChartClient";

export default function Home() {
  return (
    <main className="min-h-dvh grid md:grid-cols-[260px_1fr]">
      <aside className="border-r bg-white">
        <Sidebar />
      </aside>

      <section className="p-6 space-y-6">
        <header className="flex items-baseline justify-between">
          <h1 className="text-2xl font-semibold">AI Travel Guide</h1>
          <p className="text-sm text-gray-500">Demo dashboard</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <h2 className="mb-2 font-medium">Visitors per stop</h2>
            <ChartClient />
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="mb-2 font-medium">Today’s plan</h2>
            <ul className="list-disc pl-5 text-sm leading-7">
              <li>Saint Lazarus Church — 10:30</li>
              <li>Old Larnaka Wine Bar — 11:15</li>
              <li>Finikoudes Promenade — 12:10</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
