"use client";
import { useEffect, useState } from "react";

export function ChartValue({ value }: { value: number }) {
  const [formatted, setFormatted] = useState("");
  useEffect(() => {
    setFormatted(new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value));
  }, [value]);
  return <>{formatted || "…"} </>;
}
