// components/ui/use-mobile.ts
"use client";
import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 768;

export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    update();

    let mql: MediaQueryList | null = null;
    try {
      mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      mql.addEventListener?.("change", update);
    } catch {}

    window.addEventListener?.("resize", update);
    return () => {
      if (mql?.removeEventListener) mql.removeEventListener("change", update);
      window.removeEventListener?.("resize", update);
    };
  }, []);

  return isMobile;
}
