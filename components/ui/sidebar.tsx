// components/ui/sidebar.tsx
"use client";

import React, { useEffect, useId, useState } from "react";

/** Можно заменить своими значениями/вынести в конфиг */
const SIDEBAR_COOKIE_NAME = "sidebar_open";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 год

type SidebarProps = {
  /** Если у тебя уже есть openState извне — пробрось его сюда */
  openState?: boolean;
  /** Если у тебя есть собственный обработчик клавиш — передай его сюда */
  onKeyDown?: (e: KeyboardEvent) => void;
};

/** Стабильный «процент» 50–89% на основе useId (без Math.random) */
function stablePercent(seed: string): string {
  let h = 2166136261 >>> 0; // FNV-1a
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const val = (h % 40) + 50; // 50..89
  return `${val}%`;
}

export default function Sidebar({ openState = true, onKeyDown }: SidebarProps) {
  const id = useId();
  const percent = stablePercent(id);

  // cookie — только на клиенте
  useEffect(() => {
    try {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    } catch {}
  }, [openState]);

  // keydown listener — только на клиенте
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (onKeyDown) onKeyDown(e);
      // Твой хоткей по желанию:
      // if (e.key === "Escape") { ... }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKeyDown]);

  /** Пример простого содержимого — замени на свою разметку, если нужно */
  return (
    <nav className="p-4 space-y-4">
      <div className="text-sm text-gray-500">Sidebar</div>
      <div className="text-xs text-gray-400">Uptime: {percent}</div>

      <ul className="space-y-2 text-sm">
        <li><a href="/" className="hover:underline">Dashboard</a></li>
        <li><a href="/itinerary" className="hover:underline">Itinerary</a></li>
      </ul>
    </nav>
  );
}
